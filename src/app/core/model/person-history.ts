import {DictionaryValue} from "./dictionary-value";

export interface PersonDocumentDto {
  id: number;
  documentType?: DictionaryValue | null;
  documentInvalidity?: DictionaryValue | null;
  documentNumber?: string | null;
  documentBeginDate?: string | null;
  documentEndDate?: string | null;
  documentIssueOrg?: DictionaryValue | null;
}

export interface PersonAddressDto {
  id: number;
  addressDistricts?: DictionaryValue | null;
  addressRegion?: DictionaryValue | null;
  addressCity?: DictionaryValue | null;
  addressStreet?: string | null;
  addressBuilding?: string | null;
  addressCorpus?: string | null;
  addressFlat?: string | null;
  addressDate?: string | null;
  addressCloseDate?: string | null;
  addressStatus?: DictionaryValue | null;
  factAdress?: string | null;
}

export interface PersonHistoryDto {
  id: number;
  personId: number;
  regTime?: string | null;
  iin?: string | null;
  surname?: string | null;
  firstname?: string | null;
  secondname?: string | null;
  sex?: DictionaryValue | null;
  citizenship?: DictionaryValue | null;
  birthDate?: string | null;
  deathDate?: string | null;
  personStatus?: DictionaryValue | null;

  birthSvidNumber?: string | null;
  birthSvidBeginDate?: string | null;
  birthSvidIssueOrgName?: string | null;

  documents?: PersonDocumentDto[] | null;
  addresses?: PersonAddressDto | null;
}
