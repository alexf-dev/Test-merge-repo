import {DictionaryValue} from "./dictionary-value";
import {ExpertopinionHistory} from "./expertopinion-history";
import {ExaminationDirection} from "./examination-direction";

export class History {

  id: number;
  personId: number;
  num: number;
  isCompleted: boolean;
  surname: string;
  mseCodeId: boolean;
  isActive: boolean;
  beginDate: string;
  placeId: DictionaryValue;
  directions: ExaminationDirection;
  expertopinionList: ExpertopinionHistory[];

  constructor(init: Partial<History>) {
    Object.assign(this, init)
  }

  static getEmptyInstance() {
    return new History({});
  }
}
