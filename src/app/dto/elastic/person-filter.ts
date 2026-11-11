
export class  PersonFilter {
  iin?: string;
  surname?: string;
  firstname?: string;
  secondname?: string;
  pageNum?: number;
  pageSize?: number;
  status?: StatusDto;
  birthDate?: string;
}


export class StatusDto
{
  id?: number;
  code?: string;
  nameKz?: string;
  nameRu?: string;

}
