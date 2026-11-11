export default class Response {
  result: any;
  private secondResult;
  private errorCode;
  constructor(result: string, secondResult: string, errorCode: string);
  getResult(): string;
  getResultObject(): any;
  getSecondResult(): string;
  getErrorCode(): string;
  isOk(): boolean;
  isPasswordAttemptsError(): boolean;
  isPasswordError(): boolean;
  isKeyTypeError(): boolean;
  isRdnNotFoundError(): boolean;
  isXmlParseError(): boolean;
  isSignatureValidationError(): boolean;
  isCommonError(): boolean;
  isKeyStoreError(): boolean;
  isUnknownStorageError(): boolean;
  isFileReadError(): boolean;
}
