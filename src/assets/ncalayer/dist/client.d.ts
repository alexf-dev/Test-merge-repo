import Response from './response';
export declare enum Method {
  None = 'none',
  BrowseKeyStore = 'browseKeyStore',
  ShowFileChooser = 'showFileChooser',
  GetKeys = 'getKeys',
  SetLocale = 'setLocale',
  GetNotBefore = 'getNotBefore',
  GetNotAfter = 'getNotAfter',
  GetSubjectDN = 'getSubjectDN',
  GetIssuerDN = 'getIssuerDN',
  GetRdnByOid = 'getRdnByOid',
  SignPlainData = 'signPlainData',
  VerifyPlainData = 'verifyPlainData',
  CreateCMSSignature = 'createCMSSignature',
  VerifyCMSSignature = 'verifyCMSSignature',
  CreateCMSSignatureFromFile = 'createCMSSignatureFromFile',
  VerifyCMSSignatureFromFile = 'verifyCMSSignatureFromFile',
  SignXml = 'signXml',
  VerifyXml = 'verifyXml',
  SignXmlByElementId = 'signXmlByElementId',
  VerifyXmlByElementId = 'verifyXmlByElementId',
  GetHash = 'getHash',
}
export declare type Payload = {
  module?: string;
  method: Method;
  args: any[];
};
export declare type Callback = (resp: Response) => void;
export declare type ClientError = {
  message: string;
};
export default class Client {
  private cb;
  private ws;
  private err;
  method: Method;
  version: string;
  constructor(ws: WebSocket);
  readyState(): number;
  close(): void;
  hasError(): boolean;
  getError(): ClientError;
  send(data: Payload, callback: Callback): Method;
  browseKeyStore(
    storageName: string,
    fileExtension: string,
    currentDirectory: string,
    callback: Callback
  ): void;
  showFileChooser(
    fileExtension: string,
    currentDirectory: string,
    callback: Callback
  ): void;
  getKeys(
    storageName: string,
    storagePath: string,
    password: string,
    type: string,
    callback: Callback
  ): void;
  setLocale(lang: string, callback: Callback): void;
  getNotBefore(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    callback: Callback
  ): void;
  getNotAfter(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    callback: Callback
  ): void;
  getSubjectDN(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    callback: Callback
  ): void;
  getIssuerDN(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    callback: Callback
  ): void;
  getRdnByOid(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    oid: string,
    oidIndex: number,
    callback: Callback
  ): void;
  signPlainData(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    toSign: string,
    callback: Callback
  ): void;
  verifyPlainData(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    toVerify: string,
    signature: string,
    callback: Callback
  ): void;
  createCMSSignature(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    toSign: string,
    attached: boolean,
    callback: Callback
  ): void;
  verifyCMSSignature(
    toVerify: string,
    signature: string,
    callback: Callback
  ): void;
  createCMSSignatureFromFile(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    filePath: string,
    attached: boolean,
    callback: Callback
  ): void;
  verifyCMSSignatureFromFile(
    filePath: string,
    signature: string,
    callback: Callback
  ): void;
  signXml(
    storageName: string,
    keyAlias: string,
    toSign: string,
    callback: Callback
  ): void;
  signXmls(
    storageName: string,
    keyAlias: string,
    toSign: string[],
    callback: Callback
  ): void;
  verifyXml(signature: string, callback: Callback): void;
  signXmlByElementId(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    toSign: string,
    elementName: string,
    idAttrName: string,
    parentElementName: string,
    callback: Callback
  ): void;
  verifyXmlByElementId(
    signature: string,
    idAttrName: string,
    parentElementName: string,
    callback: Callback
  ): void;
  getHash(input: string, digestAlg: string, callback: Callback): void;
}
