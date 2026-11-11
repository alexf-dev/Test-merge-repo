export interface IndepExpertActsDto {
  id: number;
  regionKz: string | null;
  regionRu: string | null;
  expertId: number;
  expertFullName: string | null;
  period: string | null;
  rdate: string | null;
  expertDate: string | null;
  bossDeadlineDate: string | null;
  expRevDeadlineDate: string | null;
  expertSignedXml: string | null;
  bossId: number | null;
  bossFullName: string | null;
  bossDate: string | null;
  status: number | null;
  errorMsg: string | null;
  bossRevisionDate: string | null;
  expRevisionDate: string | null;
  revisionReason: string | null;
}
