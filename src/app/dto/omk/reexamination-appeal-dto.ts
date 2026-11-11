import {DictionaryValue} from "../../core/model/dictionary-value";

export class ReexaminationAppealDto {
  patientId:  number | null = null;
  isAppeal: number | null = null;
  reExaminationAppealTypes?: ReExaminationAppealTypeDto[] = [];
  notes: string | null = null;
  objectiveExamination: string | null = null;
  additionalLabData: string | null = null;
  conclusionRecommendations: string | null = null;

  dateReceipt: Date | null = null;
  incomingLetterNo: string | null = null;
  file: File | null = null;
  fileId: number | null = null;
  selectedFileName: string | null = null;

  status?: DictionaryValue;

  committeeComment: string | null = null;
}

export class ReExaminationAppealTypeDto {
  appealType: number | null = null;
}
