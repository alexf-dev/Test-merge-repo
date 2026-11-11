'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Method = void 0;
const response_1 = require('./response');
var Method;
(function (Method) {
  Method['None'] = 'none';
  Method['BrowseKeyStore'] = 'browseKeyStore';
  Method['ShowFileChooser'] = 'showFileChooser';
  Method['GetKeys'] = 'getKeys';
  Method['SetLocale'] = 'setLocale';
  Method['GetNotBefore'] = 'getNotBefore';
  Method['GetNotAfter'] = 'getNotAfter';
  Method['GetSubjectDN'] = 'getSubjectDN';
  Method['GetIssuerDN'] = 'getIssuerDN';
  Method['GetRdnByOid'] = 'getRdnByOid';
  Method['SignPlainData'] = 'signPlainData';
  Method['VerifyPlainData'] = 'verifyPlainData';
  Method['CreateCMSSignature'] = 'createCMSSignature';
  Method['VerifyCMSSignature'] = 'verifyCMSSignature';
  Method['CreateCMSSignatureFromFile'] = 'createCMSSignatureFromFile';
  Method['VerifyCMSSignatureFromFile'] = 'verifyCMSSignatureFromFile';
  Method['SignXml'] = 'signXml';
  Method['SignXmls'] = 'signXmls';
  Method['VerifyXml'] = 'verifyXml';
  Method['SignXmlByElementId'] = 'signXmlByElementId';
  Method['VerifyXmlByElementId'] = 'verifyXmlByElementId';
  Method['GetHash'] = 'getHash';
})((Method = exports.Method || (exports.Method = {})));
class Client {
  constructor(ws) {
    this.err = { message: '' };
    this.method = Method.None;
    this.version = '';
    if (ws) {
      this.cb = resp => {
        var _a;
        this.version =
          (_a = resp.getResultObject()) === null || _a === void 0
            ? void 0
            : _a.version;
      };
      this.ws = ws;
      this.ws.onmessage = e => {
        // Skip this because setLocale returns nothing.
        if (this.method === Method.SetLocale) return;
        const data = JSON.parse(e.data);
        if (data) {
          this.cb(new response_1.default(data));
        } else {
          console.log(
            'onmessage: proper callback is not set or wrong data format:'
          );
          console.log(JSON.stringify(e.data));
        }
      };
      return;
    }
    this.err = { message: 'init: websocket instance is null or undefined' };
  }
  readyState() {
    return this.ws.readyState;
  }
  close() {
    this.ws.close();
  }
  hasError() {
    var _a;
    return (
      ((_a = this.err) === null || _a === void 0 ? void 0 : _a.message) != ''
    );
  }
  getError() {
    return this.err;
  }
  send(data, callback) {
    // Return none if client has error.
    if (this.hasError()) return Method.None;
    this.method = data.method;
    this.cb = callback;
    this.ws.send(JSON.stringify(data));
  }
  browseKeyStore(storageName, fileExtension, currentDirectory, callback) {
    this.send(
      {
        method: Method.BrowseKeyStore,
        args: [storageName, fileExtension, currentDirectory],
      },
      callback
    );
  }
  showFileChooser(fileExtension, currentDirectory, callback) {
    this.send(
      {
        method: Method.ShowFileChooser,
        args: [fileExtension, currentDirectory],
      },
      callback
    );
  }
  getKeys(storageName, storagePath, password, type, callback) {
    this.send(
      {
        method: Method.GetKeys,
        args: [storageName, storagePath, password, type],
      },
      callback
    );
  }
  setLocale(lang, callback) {
    this.send(
      {
        method: Method.SetLocale,
        args: [lang],
      },
      callback
    );
  }
  getNotBefore(storageName, storagePath, keyAlias, password, callback) {
    this.send(
      {
        method: Method.GetNotBefore,
        args: [storageName, storagePath, keyAlias, password],
      },
      callback
    );
  }
  getNotAfter(storageName, storagePath, keyAlias, password, callback) {
    this.send(
      {
        method: Method.GetNotAfter,
        args: [storageName, storagePath, keyAlias, password],
      },
      callback
    );
  }
  getSubjectDN(storageName, storagePath, keyAlias, password, callback) {
    this.send(
      {
        method: Method.GetSubjectDN,
        args: [storageName, storagePath, keyAlias, password],
      },
      callback
    );
  }
  getIssuerDN(storageName, storagePath, keyAlias, password, callback) {
    this.send(
      {
        method: Method.GetIssuerDN,
        args: [storageName, storagePath, keyAlias, password],
      },
      callback
    );
  }
  getRdnByOid(
    storageName,
    storagePath,
    keyAlias,
    password,
    oid,
    oidIndex,
    callback
  ) {
    this.send(
      {
        method: Method.GetRdnByOid,
        args: [storageName, storagePath, keyAlias, password, oid, oidIndex],
      },
      callback
    );
  }
  signPlainData(
    storageName,
    storagePath,
    keyAlias,
    password,
    toSign,
    callback
  ) {
    this.send(
      {
        method: Method.SignPlainData,
        args: [storageName, storagePath, keyAlias, password, toSign],
      },
      callback
    );
  }
  verifyPlainData(
    storageName,
    storagePath,
    keyAlias,
    password,
    toVerify,
    signature,
    callback
  ) {
    this.send(
      {
        method: Method.VerifyPlainData,
        args: [
          storageName,
          storagePath,
          keyAlias,
          password,
          toVerify,
          signature,
        ],
      },
      callback
    );
  }
  createCMSSignature(
    storageName,
    storagePath,
    keyAlias,
    password,
    toSign,
    attached,
    callback
  ) {
    this.send(
      {
        method: Method.CreateCMSSignature,
        args: [storageName, storagePath, keyAlias, password, toSign, attached],
      },
      callback
    );
  }
  verifyCMSSignature(toVerify, signature, callback) {
    this.send(
      {
        method: Method.VerifyCMSSignature,
        // swap params due to NCALayer' inconvenient order
        args: [signature, toVerify],
      },
      callback
    );
  }
  createCMSSignatureFromFile(
    storageName,
    storagePath,
    keyAlias,
    password,
    filePath,
    attached,
    callback
  ) {
    this.send(
      {
        method: Method.CreateCMSSignatureFromFile,
        args: [
          storageName,
          storagePath,
          keyAlias,
          password,
          filePath,
          attached,
        ],
      },
      callback
    );
  }
  verifyCMSSignatureFromFile(filePath, signature, callback) {
    this.send(
      {
        method: Method.VerifyCMSSignatureFromFile,
        // swap params due to NCALayer' inconvenient order
        args: [signature, filePath],
      },
      callback
    );
  }
  signXml(storageName, keyAlias, toSign, callback) {
    this.send(
      {
        module: 'kz.gov.pki.knca.commonUtils',
        method: Method.SignXml,
        args: [storageName, keyAlias, toSign, '', ''],
      },
      callback
    );
  }
  signXmls(storageName, keyAlias, toSign, callback) {
    this.send(
      {
        module: 'kz.gov.pki.knca.commonUtils',
        method: Method.SignXmls,
        args: [storageName, keyAlias, toSign, '', ''],
      },
      callback
    );
  }
  verifyXml(signature, callback) {
    this.send(
      {
        method: Method.VerifyXml,
        args: [signature],
      },
      callback
    );
  }
  signXmlByElementId(
    storageName,
    storagePath,
    keyAlias,
    password,
    toSign,
    elementName,
    idAttrName,
    parentElementName,
    callback
  ) {
    this.send(
      {
        method: Method.SignXmlByElementId,
        args: [
          storageName,
          storagePath,
          keyAlias,
          password,
          toSign,
          elementName,
          idAttrName,
          parentElementName,
        ],
      },
      callback
    );
  }
  verifyXmlByElementId(signature, idAttrName, parentElementName, callback) {
    this.send(
      {
        method: Method.VerifyXml,
        args: [signature, idAttrName, parentElementName],
      },
      callback
    );
    this.method = Method.VerifyXmlByElementId;
  }
  getHash(input, digestAlg, callback) {
    this.send(
      {
        method: Method.GetHash,
        args: [input, digestAlg],
      },
      callback
    );
  }
}
exports.default = Client;
