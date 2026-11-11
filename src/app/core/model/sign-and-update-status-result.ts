export type SignAndUpdateStatusResult =
  | 'SUCCESS'
  | 'STATUS_NOT_FOUND'
  | 'INVALID_STATUS'
  | 'STATUS_ALREADY_CHANGED'
  | 'SIGN_NOT_VALID'
  | 'ACCESS_DENIED';
