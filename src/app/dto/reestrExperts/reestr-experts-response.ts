import {DictionaryValue} from "../../core/model/dictionary-value";

export class ReestrExpertsResponse {
  id: number | null = null;
  empFullName: string | null = null;
  iin: string | null = null;
  region: DictionaryValue;
  workPlace: string | null = null;
  mseWorkExperience: number | null = null;
  dateOfEmployment: Date | null = null;
  dateOfDismissal: Date | null = null;
  status: DictionaryValue;

}
