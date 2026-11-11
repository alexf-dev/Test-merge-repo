export class DictionaryValue {
  id: number;
  parId: number | null;
  code: string;
  nameRu: string;
  nameKz: string;
  customKz: string | null;
  customRu: string | null;
  customInt: number | null;
  customText: string | null;
  json: any;
  dictionaryId: number | null;
  oldId: number;
  ageNum: number | null;

  constructor(init: Partial<DictionaryValue>) {
    Object.assign(this, init);
  }
}
