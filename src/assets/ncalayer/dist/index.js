'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.extractKeyAlias = exports.Response = exports.Method = void 0;
const client_1 = require('./client');
Object.defineProperty(exports, 'Method', {
  enumerable: true,
  get: function () {
    return client_1.Method;
  },
});
const response_1 = require('./response');
exports.Response = response_1.default;
const helpers_1 = require('./helpers');
Object.defineProperty(exports, 'extractKeyAlias', {
  enumerable: true,
  get: function () {
    return helpers_1.extractKeyAlias;
  },
});
exports.default = client_1.default;
