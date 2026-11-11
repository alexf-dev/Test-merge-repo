import { HttpErrorResponse } from '@angular/common/http';

/** Типы ошибок API, которые перехватывает ErrorInterceptor */
export enum ApiErrorType {
  NoConnection = 'NO_CONNECTION',
  NotFound = 'NOT_FOUND',
  ServerError = 'SERVER_ERROR'
}

/** Ключи переводов для заголовка и текста модального окна */
export interface ApiErrorInfo {
  titleKey: string;
  messageKey: string;
}

/**
 * Карта "тип ошибки -> ключи переводов".
 * Чтобы добавить новый тип ошибки: добавь значение в enum, запись сюда,
 * запись в STATUS_TO_TYPE и переводы в ru/kk. Больше ничего менять не нужно.
 */
export const API_ERROR_INFO: Record<ApiErrorType, ApiErrorInfo> = {
  [ApiErrorType.NoConnection]: {
    titleKey: 'MAIN.ERRORS.NO_CONNECTION.TITLE',
    messageKey: 'MAIN.ERRORS.NO_CONNECTION.MESSAGE'
  },
  [ApiErrorType.NotFound]: {
    titleKey: 'MAIN.ERRORS.NOT_FOUND.TITLE',
    messageKey: 'MAIN.ERRORS.NOT_FOUND.MESSAGE'
  },
  [ApiErrorType.ServerError]: {
    titleKey: 'MAIN.ERRORS.SERVER_ERROR.TITLE',
    messageKey: 'MAIN.ERRORS.SERVER_ERROR.MESSAGE'
  }
};

/**
 * Карта "HTTP-статус -> тип ошибки".
 * status 0 = сетевая ошибка (нет интернета, сервер недоступен, CORS).
 * Для добавления новых кодов (401, 403, 409...) просто добавь строку сюда.
 */
const STATUS_TO_TYPE: Record<number, ApiErrorType> = {
  0: ApiErrorType.NoConnection,
  404: ApiErrorType.NotFound,
  500: ApiErrorType.ServerError
};

/** Определяет тип ошибки по ответу; null = ошибку не показываем (проходит дальше как есть) */
export function resolveApiErrorType(error: HttpErrorResponse): ApiErrorType | null {
  return STATUS_TO_TYPE[error.status] ?? null;
}
