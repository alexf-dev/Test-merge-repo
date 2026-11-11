'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.extractKeyAlias = void 0;
exports.extractKeyAlias = s => {
  const parts = s.split('|');
  if (parts.length < 4) {
    return '';
  }
  return parts[3];
};
