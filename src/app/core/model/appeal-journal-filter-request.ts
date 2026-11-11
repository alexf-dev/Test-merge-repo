export interface AppealJournalFilterRequest {
  actNumber?: string | null;
  fio?: string | null;
  status?: number | null;
  pageNum: number | null;
  pageSize: number | null;
}
