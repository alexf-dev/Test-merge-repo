import {DictionaryValue} from "../../core/model/dictionary-value";

export class ExpertOpinionOmk {
  id: number | null = null;
  disabilityGroup: DictionaryValue;
  deadline: DictionaryValue;
  termReceived: Date | null = null;
  reasonDisabilityAccordForm7: string | null = null;
  reasonforDisability: string | null = null;
  informDisability: string | null = null;
  uotDegree: string | null = null;
  deadline2: DictionaryValue;
  termUotReceived: Date | null = null;
  uptData: UptDataOmk[] = [];

}

export class UptDataOmk {
  degreeUpt: string | null = null;
  deadline2: DictionaryValue;
  termUptDate: Date | null = null;
}
