'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
class Response {
  constructor(result, secondResult, errorCode) {
    this.result = result || '';
    this.secondResult = secondResult || '';
    this.errorCode = errorCode || '';
  }
  getResult() {
    return this.result;
  }
  getResultObject() {
    return this.result;
  }
  getSecondResult() {
    return this.secondResult;
  }
  getErrorCode() {
    return this.errorCode;
  }
  isOk() {
    return this.errorCode === 'NONE';
  }
  isPasswordAttemptsError() {
    return this.isPasswordError() && +this.result > -1;
  }
  isPasswordError() {
    return this.errorCode === 'WRONG_PASSWORD';
  }
  isKeyTypeError() {
    return this.errorCode === 'EMPTY_KEY_LIST';
  }
  isRdnNotFoundError() {
    return this.errorCode === 'RDN_NOT_FOUND';
  }
  isXmlParseError() {
    return this.errorCode === 'XML_PARSE_EXCEPTION';
  }
  isSignatureValidationError() {
    return this.errorCode === 'SIGNATURE_VALIDATION_ERROR';
  }
  isCommonError() {
    return this.errorCode === 'COMMON';
  }
  isKeyStoreError() {
    return this.errorCode === 'LOAD_KEYSTORE_ERROR';
  }
  isUnknownStorageError() {
    return this.errorCode === 'UNKNOWN_STORAGE';
  }
  isFileReadError() {
    return this.errorCode === 'FILE_READ_ERROR';
  }
}
exports.default = Response;
