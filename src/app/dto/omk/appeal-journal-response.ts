export interface AppealJournalResponse {
  id: number;
  patientId: number;
  actNumber: string;
  isAppeal: number;
  dateAppeal: Date;
  statusId: number;
  nameKz: string;
  nameRu: string;
  fio: string;

}
