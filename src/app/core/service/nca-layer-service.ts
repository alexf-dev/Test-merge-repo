import { Injectable } from '@angular/core';

export type NcaStorage = 'PKCS12' | 'AKKaztokenStore' | 'AKKZIDCardStore' | string;
export type NcaKeyType = 'SIGNATURE' | 'AUTHENTICATION';

export interface NcaKeyInfo {
  alias?: string;
  keyId?: string;
  algorithm?: string;
  subjectCn?: string;
  subjectDn?: string;
  issuerCn?: string;
  issuerDn?: string;
  serialNumber?: string;
  certNotAfter?: string | number;
  certNotBefore?: string | number;
  authorityKeyIdentifier?: string;
  pem?: string;
}

interface NcaResponse<T> {
  code?: string | number;
  message?: string;
  responseObject?: T;
  result?: T;
  errorCode?: string;
  status?: boolean;
  body?: { result?: T };
  details?: string;
}

@Injectable({ providedIn: 'root' })
export class NcaLayerService {
  private readonly url = 'wss://127.0.0.1:13579/';
  private readonly moduleName = 'kz.gov.pki.knca.commonUtils';
  private readonly timeoutMs = 120_000;

  /** Создаёт отдельное WebSocket-соединение на одну операцию; параллельные вызовы не смешиваются. */
  private request<T>(method: string, args: unknown[] | Record<string, unknown> = [], module = this.moduleName): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const socket = new WebSocket(this.url);
      let finished = false;
      const timer = setTimeout(() => finish(new Error('Истекло время ожидания NCALayer')), this.timeoutMs);

      const finish = (error?: Error, value?: T): void => {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        socket.close();
        if (error) reject(error);
        else resolve(value as T);
      };

      socket.onopen = () => {
        socket.send(JSON.stringify({ module, method, args }));
      };

      socket.onmessage = event => {
        try {
          const response = JSON.parse(String(event.data)) as NcaResponse<T>;
          // NCALayer может прислать приветственное сообщение с версией до результата команды.
          if (response.result && typeof response.result === 'object'
            && !Array.isArray(response.result)
            && 'version' in response.result
            && response.code == null && response.status == null) {
            return;
          }
          // Новый протокол kz.gov.pki.knca.basics: {status, body: {result}}
          if (typeof response.status === 'boolean') {
            if (!response.status) {
              finish(new Error(response.message || response.details || `Ошибка NCALayer: ${response.code ?? 'unknown'}`));
            } else if (response.body && Object.prototype.hasOwnProperty.call(response.body, 'result')) {
              finish(undefined, response.body.result);
            } else {
              finish(new Error('Подписание отменено или NCALayer не вернул результат'));
            }
          } else if (response.code != null) {
            if (String(response.code) === '200') {
              finish(undefined, response.responseObject);
            } else {
              finish(new Error(response.message || `Ошибка NCALayer: ${response.code}`));
            }
          } else if (response.errorCode) {
            finish(new Error(response.message || response.errorCode));
          } else if ('result' in response) {
            finish(undefined, response.result);
          } else {
            finish(new Error('Неизвестный формат ответа NCALayer'));
          }
        } catch {
          finish(new Error('Некорректный JSON от NCALayer'));
        }
      };

      socket.onerror = () => finish(new Error('Не удалось подключиться к NCALayer. Проверьте, что приложение запущено.'));
      socket.onclose = () => {
        if (!finished) finish(new Error('NCALayer закрыл соединение до получения ответа'));
      };
    });
  }

  getActiveTokens(): Promise<string[]> {
    return this.request<string[]>('getActiveTokens');
  }

  getKeyInfo(storage: NcaStorage = 'PKCS12'): Promise<NcaKeyInfo> {
    return this.request<NcaKeyInfo>('getKeyInfo', [storage]);
  }

  /** Подписание XML через актуальный модуль basics. */
  private async signBasicsXml(data: string | string[], storage: NcaStorage): Promise<string | string[]> {
    const result = await this.request<string | string[]>(
      'sign',
      {
        allowedStorages: [storage],
        format: 'xml',
        data,
        signingParams: {},
        signerParams: { extKeyUsageOids: ['1.3.6.1.5.5.7.3.4'] },
        locale: 'ru'
      },
      'kz.gov.pki.knca.basics'
    );
    return result;
  }

  async signXml(xml: string, storage: NcaStorage = 'PKCS12', _keyType: NcaKeyType = 'SIGNATURE'): Promise<string> {
    if (!xml?.trim()) throw new Error('XML для подписи пуст');
    const result = await this.signBasicsXml(xml, storage);
    const signed = Array.isArray(result) ? result[0] : result;
    if (typeof signed !== 'string' || !signed.trim()) {
      throw new Error('NCALayer не вернул подписанный XML');
    }
    return signed;
  }

  async signXmls(xmls: string[], storage: NcaStorage = 'PKCS12', _keyType: NcaKeyType = 'SIGNATURE'): Promise<string[]> {
    if (!xmls.length || xmls.some(xml => !xml?.trim())) {
      throw new Error('Для signXmls нужен непустой массив XML без пустых элементов');
    }
    const response = await this.signBasicsXml(xmls, storage);
    const signed = Array.isArray(response) ? response : [response];
    if (signed.length !== xmls.length || signed.some(xml => typeof xml !== 'string' || !xml.trim())) {
      throw new Error(`NCALayer вернул ${signed.length} подписей вместо ${xmls.length} или пустые XML`);
    }
    return signed;
  }

  /** Сохраняет пустые позиции, не подменяя исходные XML пустыми ответами. */
  async signXmlArrayKeepingPositions(
    xmls: Array<string | null | undefined>,
    storage: NcaStorage = 'PKCS12'
  ): Promise<string[]> {
    const filled = xmls.flatMap((xml, index) => xml?.trim() ? [{ xml, index }] : []);
    if (!filled.length) throw new Error('Нет XML для подписания');
    const signed = await this.signXmls(filled.map(item => item.xml), storage);
    const result = xmls.map(xml => xml ?? '');
    filled.forEach((item, index) => { result[item.index] = signed[index]; });
    return result;
  }

  createCAdESFromBase64(base64: string, attach = false, storage: NcaStorage = 'PKCS12'): Promise<string> {
    if (!base64.trim()) return Promise.reject(new Error('Base64 для подписи пуст'));
    return this.request<string>('createCAdESFromBase64', [storage, 'SIGNATURE', base64, attach]);
  }

  createCAdESFromBase64Hash(hashBase64: string, storage: NcaStorage = 'PKCS12'): Promise<string> {
    if (!hashBase64.trim()) return Promise.reject(new Error('Хеш для подписи пуст'));
    return this.request<string>('createCAdESFromBase64Hash', [storage, 'SIGNATURE', hashBase64]);
  }

  createCAdESFromFile(path: string, attach = false, storage: NcaStorage = 'PKCS12'): Promise<string> {
    if (!path.trim()) return Promise.reject(new Error('Не выбран файл для подписи'));
    return this.request<string>('createCAdESFromFile', [storage, 'SIGNATURE', path, attach]);
  }

  createCMSSignatureFromFile(path: string, attach = false, storage: NcaStorage = 'PKCS12'): Promise<string> {
    if (!path.trim()) return Promise.reject(new Error('Не выбран файл для подписи'));
    return this.request<string>('createCMSSignatureFromFile', [storage, 'SIGNATURE', path, attach]);
  }

  createCMSSignatureFromBase64(base64: string, attach = false, storage: NcaStorage = 'PKCS12'): Promise<string> {
    if (!base64.trim()) return Promise.reject(new Error('Base64 для подписи пуст'));
    return this.request<string>('createCMSSignatureFromBase64', [storage, 'SIGNATURE', base64, attach]);
  }

  applyCAdEST(cmsBase64: string, storage: NcaStorage = 'PKCS12'): Promise<string> {
    if (!cmsBase64.trim()) return Promise.reject(new Error('CMS для наложения метки времени пуст'));
    return this.request<string>('applyCAdEST', [storage, 'SIGNATURE', cmsBase64]);
  }

  showFileChooser(): Promise<string> {
    return this.request<string>('showFileChooser', ['ALL', '']);
  }
}
