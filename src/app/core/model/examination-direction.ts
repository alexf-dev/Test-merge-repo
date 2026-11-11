import {DictionaryValue} from "./dictionary-value";

export class ExaminationDirection {
  id: number;
  directionId: DictionaryValue;
  createDate: Date;

  constructor(init: Partial<ExaminationDirection>) {
    Object.assign(this, init);
  }
}
