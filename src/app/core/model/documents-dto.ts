export interface DocumentsDto {
  fileId: number;
  code: string;
  name: string;
  org: string;
  dat: Date;
  startDate: Date;
  dischargeDate: Date;
  dischargeNum: string;
  operationCodeName: string;
}

export interface DocumentsListDto {
  group1: DocumentsDto[];
  group2: DocumentsDto[];
  group3: DocumentsDto[];
}
