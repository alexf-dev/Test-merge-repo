export class CreateReestrExpertDto {
   iin: string | null = null;
   region: number | null = null;
   omik: number | null = null;
   mseId: string | null = null;
   dateOfEmployment: Date | string | null = null;
   position: number | null = null;
   ageGroup: number | null = null;
   empFullName: string | null = null;
   mobNumber: string | null = null;
   mseWorkExperience: number | null = null;
   mkbs?: MkbsDto[] = [];
}

export class MkbsDto {
  mkbId: number | null = null;
}

