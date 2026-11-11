import {DictionaryValue} from "./dictionary-value";
import {Dictionary} from "./dictionary";
import {ExaminationDirection} from "./examination-direction";
import {UptData} from "./upt-data";

export class ExpertopinionHistory {
  id: number;
  isLast: boolean;
  isAppeal: boolean;
  examinationDate: Date;
  finishExaminationDate: Date;
  validity: DictionaryValue;
  informDisability: string;
  statusIdSolutions: number;
  disabilityGroupId: DictionaryValue;
  reasonDisabilityAccordForm7: DictionaryValue;
  deadlineId: DictionaryValue;
  disabEstForPeriodTo: Date;
  uotDegree: number;
  deadline2Id: DictionaryValue;
  uotDegreeSetTo: Date;
  uptData: UptData[];
  poorlyFilled: boolean;

  constructor(init: Partial<ExpertopinionHistory>) {
    Object.assign(this, init);
  }
}
