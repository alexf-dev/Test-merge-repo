export interface CreateExaminationDto {
  personId: number;
  appId: number;
  personHistoryId?: number | null;
  zNewFormId?: number | null;
  phone?: string | null;
}

export class CreateExaminationResponseDto {
  patientId: number;
  expertOpinionId: number;
}
