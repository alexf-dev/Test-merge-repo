import {DictinoryValue} from "../dictinory-value";


export interface Patient {
  fio: string;
  iin: string;
  region: RegionDto;
  birth: string;
  surname: string ;
  firstName: string;
  secondName: string;
  birthDate: string;
  personStatusId: number;
  persStatus: any;
  status: StatusDto;
}
export class StatusDto
{
  id?: number;
  code?: string;
  nameKz?: string;
  nameRu?: string;

}

export class RegionDto {
  code: string;
  id: number;
}
