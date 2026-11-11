export interface JournalApprovalFilter {
  iin?: string | null;
  status?: string | null;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  pageNum: number | null;
  pageSize: number | null;
}
