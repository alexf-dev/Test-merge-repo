import {DictionaryValue} from "../core/model/dictionary-value";

export interface Document {
  id: number;
  personId: number;
  documentType: DictionaryValue;
  documentInvalidity: DictionaryValue;
  documentNumber: string;
  documentBeginDate: string;
  documentEndDate: string;
  documentIssueOrg: DictionaryValue;
}

export interface Address {
  id: number;
  personId: number;
  addressDistricts: DictionaryValue;
  addressRegion: DictionaryValue;
  addressCity: string;
  addressStreet: string;
  addressBuilding: string;
  addressCorpus: string | null;
  addressFlat: string;
  addressRca: string;
  addressDate: string;
  addressCloseDate: string | null;
  addressStatus: DictionaryValue;
  arKatoDistricts: any;
  arKatoRegion: any;
  arKatoSo: any;
  arKatoNasPunkt: any;
  arGeonim: any;
  arBuilding: any;
  arFlat: any;
  arTextAdress: any;
  factAdress: any;
  nasPunktType: any;
}

export class PersonDto {
  id?: number;
  regTime?: string;
  changeTime?: string;
  iin?: string;
  surname?: string;
  firstName?: string;
  secondName?: string;
  sex?: DictionaryValue;
  citizenship?: DictionaryValue;
  birthDate?: Date;
  deathDate?: string | null;
  personStatus?: DictionaryValue;
  capableStatus?: DictionaryValue;
  excludeReason?: DictionaryValue;
  birthSvidNumber?: string | null;
  birthSvidBeginDate?: string | null;
  birthSvidIssueOrgName?: string | null;
  region?: DictionaryValue | null;
  status?: DictionaryValue | null;
  statusDate?: string;
  documents?: Document[];
  addresses?: Address;
  personHistory?: any;
}
