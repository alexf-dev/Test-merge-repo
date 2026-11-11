/** Чекбокс + поле комментария справа */
export interface CheckComment {
  checked: boolean;
  comment: string;
}

/** Блок "Данные специалиста" */
export interface SpecialistDataDTO {
  specialist: string;
  additionalInfo: string;
}

/** Блок "Состояние" */
export interface PatientConditionDTO {
  noOrganPathology: boolean;
  generalStatus: string | null;
  patientPosition: string | null;
  bodyType: string | null;
}

/** Блок "Кожа и видимые слизистые" */
export interface SkinMucousDTO {
  normalColor: boolean;
  cyanotic: CheckComment;
  nasolabialCyanosis: boolean;
  hyperemic: CheckComment;
  hemorrhages: CheckComment;
  xanthomas: CheckComment;
  depigmentation: CheckComment;
  drySkin: CheckComment;
  coldSkin: CheckComment;
  elasticity: CheckComment;
  pale: boolean;
  acrocyanosis: boolean;
  jaundiced: CheckComment;
  earthyColor: CheckComment;
  spiderVeins: CheckComment;
  pigmentation: CheckComment;
  rashes: CheckComment;
  moistSkin: CheckComment;
  skinTurgor: CheckComment;
  skinTurgorAdditionalInfo: string;
}
