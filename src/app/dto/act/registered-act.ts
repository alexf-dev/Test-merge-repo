import {DictionaryValue} from "../../core/model/dictionary-value";

export class RegisteredAct {
  formId!: number;
  parId: number | null = null;
  rDate: Date | null = null;
  numberAKt: string | null = null;
  deadlineStartDate: Date | null = null;
  deadlineEndDate: Date | null = null;
  direction: string | null = null;
  directionKz: string | null = null;
  dataOfBirth: Date | null = null;
  ageAtResolution: number | null = null;
  genderId: number | null = null;
  mainDiagnosis: string | null = null;
  approveId: string | null = null;
  toChat: number | null = null;
  isRedistr: number | null = null;
  expertId: number | null = null;
  resolutionMainDtoId: number | null = null;
  approvedReExam: number | null = null;
  status: DictionaryValue | null = null;
}
