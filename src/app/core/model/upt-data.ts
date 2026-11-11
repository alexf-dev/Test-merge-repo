
class UptDataAddHelpDto {
  addHelpId: number | null;
}

export class UptData{
  id: number;
  aktN1Id: string | null;
  // aktN1Id: Act_n1[];
  isAdjudicate: boolean;
  referenceUpt: string;
  degreeOfUptDate: string | null;
  deadline2Id: number;
  causeUptId: number;
  termUptDate: string;
  degreeUpt: number;
  isSelected: boolean;
  needsAddForms: string;
  emptyField:string;
  isDvp: boolean;
  conclusionDvp: string;
  addHelps?: UptDataAddHelpDto[];
}
