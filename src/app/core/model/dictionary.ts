export class Dictionary {
  id: number;
  code: string;
  nameKz: string;
  nameRu: string;

  constructor(init: Partial<Dictionary>) {
    Object.assign(this, init);
  }
}
