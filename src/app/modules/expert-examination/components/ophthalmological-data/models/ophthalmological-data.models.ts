/** Модель данных формы "Офтальмологические данные" */

/** Строка "чекбокс + поле справа" */
export interface OphCheckWithValueDTO {
  checked: boolean;
  value: string;
}

/** Поля "Специалист" сверху формы */
export interface OphSpecialistDataDTO {
  specialist: string;
  specialistComment: string;
}

/** Блок "Острота зрения" */
export interface OphVisualAcuityDTO {
  odWithoutCorrection: OphCheckWithValueDTO;
  osWithoutCorrection: OphCheckWithValueDTO;
  odWithCorrection: OphCheckWithValueDTO;
  osWithCorrection: OphCheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Периметрия" */
export interface OphPerimetryDTO {
  noPathology: boolean;
  heteronymousBinasalHemianopia: OphCheckWithValueDTO;
  heteronymousBitemporalHemianopia: OphCheckWithValueDTO;
  quadrantHemianopia: OphCheckWithValueDTO;
  homonymousHemianopia: OphCheckWithValueDTO;
  concentricVisualFieldConstriction: OphCheckWithValueDTO;
  centralScotomas: OphCheckWithValueDTO;
  paracentralScotomas: OphCheckWithValueDTO;
  peripheralScotomas: OphCheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Внутриглазное давление (ВГД)" */
export interface OphIntraocularPressureDTO {
  od: OphCheckWithValueDTO;
  os: OphCheckWithValueDTO;
}

/** Блок "Веки" */
export interface OphEyelidsDTO {
  withinNormal: OphCheckWithValueDTO;
  ptosis: OphCheckWithValueDTO;
  halfPtosis: OphCheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Глазные яблоки" */
export interface OphEyeballsDTO {
  symmetrical: boolean;
  shiftedForward: OphCheckWithValueDTO;
  shiftedBackward: OphCheckWithValueDTO;
  shiftedInward: OphCheckWithValueDTO;
  shiftedOutward: OphCheckWithValueDTO;
  mobileAllDirections: OphCheckWithValueDTO;
  anophthalmos: OphCheckWithValueDTO;
  prosthetized: OphCheckWithValueDTO;
  notProsthetized: OphCheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Нистагм" */
export interface OphNystagmusDTO {
  pendular: OphCheckWithValueDTO;
  jerky: OphCheckWithValueDTO;
  horizontal: OphCheckWithValueDTO;
  vertical: OphCheckWithValueDTO;
  rotatory: OphCheckWithValueDTO;
  circumferential: OphCheckWithValueDTO;
  positional: OphCheckWithValueDTO;
  macroAmplitude: OphCheckWithValueDTO;
  mesoAmplitude: OphCheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Конъюнктива" */
export interface OphConjunctivaDTO {
  palePink: OphCheckWithValueDTO;
  pink: OphCheckWithValueDTO;
  glossy: OphCheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Слёзный аппарат" (одно поле ввода) */
export interface OphLacrimalApparatusDTO {
  value: string;
}

/** Блок "Роговица" */
export interface OphCorneaDTO {
  transparent: OphCheckWithValueDTO;
  avascular: OphCheckWithValueDTO;
  cloudy: OphCheckWithValueDTO;
  edematous: OphCheckWithValueDTO;
  centralLeucoma: OphCheckWithValueDTO;
  peripheralLeucoma: OphCheckWithValueDTO;
  categoryI: boolean;
  categoryII: boolean;
  categoryIII: boolean;
  categoryIV: boolean;
  additionalInfo: string;
}

/** Блок "Склера" */
export interface OphScleraDTO {
  congestedInjection: OphCheckWithValueDTO;
  conjunctivalInjection: OphCheckWithValueDTO;
  mixedInjection: OphCheckWithValueDTO;
  mild: boolean;
  moderate: boolean;
  marked: boolean;
  additionalInfo: string;
}

/** Блок "Передняя камера" */
export interface OphAnteriorChamberDTO {
  irregular: OphCheckWithValueDTO;
  regular: OphCheckWithValueDTO;
  mediumDepth: OphCheckWithValueDTO;
  deep: OphCheckWithValueDTO;
  shallow: OphCheckWithValueDTO;
  absent: OphCheckWithValueDTO;
  contentsTransparent: OphCheckWithValueDTO;
  contentsCloudy: OphCheckWithValueDTO;
  hypopyon: OphCheckWithValueDTO;
  hyphema: OphCheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Зрачки" */
export interface OphPupilsDTO {
  blackColor: boolean;
  roundShape: boolean;
  mediumSize: OphCheckWithValueDTO;
  sizes: OphCheckWithValueDTO;
  constricted: OphCheckWithValueDTO;
  dilated: OphCheckWithValueDTO;
  pupilOcclusion: OphCheckWithValueDTO;
  directLightReaction: OphCheckWithValueDTO;
  consensualLightReaction: OphCheckWithValueDTO;
  pseudoexfoliations: boolean;
  additionalInfo: string;
}

/** Блок "Радужка" */
export interface OphIrisDTO {
  color: OphCheckWithValueDTO;
  decolorized: OphCheckWithValueDTO;
  patternClear: OphCheckWithValueDTO;
  adhesionToCornea: OphCheckWithValueDTO;
  adhesionToLens: OphCheckWithValueDTO;
  dystrophic: OphCheckWithValueDTO;
  basalColoboma: OphCheckWithValueDTO;
  totalColoboma: OphCheckWithValueDTO;
  iridocele: OphCheckWithValueDTO;
  bombe: OphCheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Стекловидное тело" */
export interface OphVitreousBodyDTO {
  transparent: OphCheckWithValueDTO;
  notObservable: OphCheckWithValueDTO;
  opacity: OphCheckWithValueDTO;
  marked: boolean;
  moderatelyMarked: boolean;
  total: boolean;
  impregnatedWithHeme: OphCheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Хрусталик" */
export interface OphLensDTO {
  transparent: OphCheckWithValueDTO;
  subcapsularCloudy: OphCheckWithValueDTO;
  capsularCloudy: OphCheckWithValueDTO;
  absent: OphCheckWithValueDTO;
  intraocularLens: OphCheckWithValueDTO;
  surgeryContraindicated: OphCheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Глазное дно" */
export interface OphFundusDTO {
  notOphthalmoscoped: OphCheckWithValueDTO;
  opticDisc: OphCheckWithValueDTO;
  bordersClear: OphCheckWithValueDTO;
  bordersBlurred: OphCheckWithValueDTO;
  opticDiscEdema: OphCheckWithValueDTO;
  peripapillaryStaphyloma: OphCheckWithValueDTO;
  maculaNoPathology: OphCheckWithValueDTO;
  reflexesPreserved: OphCheckWithValueDTO;
  retinaTransparent: OphCheckWithValueDTO;
  retinaEdema: OphCheckWithValueDTO;
  peripheralLaserCoagulates: OphCheckWithValueDTO;
  peripheralDegenerationFoci: OphCheckWithValueDTO;
  vesselsNormalCaliber: OphCheckWithValueDTO;
  vesselsConstricted: OphCheckWithValueDTO;
  vesselsDilated: OphCheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Поведение больного" */
export interface OphPatientBehaviorDTO {
  orientatesFreely: boolean;
  doesNotOrientate: boolean;
  walksWithHelp: boolean;
  walksWithCane: boolean;
  walksIndependently: boolean;
  overcomesObstaclesFreely: boolean;
  overcomesObstaclesWithDifficulty: boolean;
  findsDoorHandleChair: boolean;
  dressesIndependently: boolean;
  dressesWithHelp: boolean;
  followsHandMovement: boolean;
}

/** Блок "Расписался в журнале" */
export interface OphSignedInJournalDTO {
  independently: boolean;
  withHelp: boolean;
}

/** Блок "Очковой коррекцией" */
export interface OphGlassesCorrectionDTO {
  uses: boolean;
  doesNotUse: boolean;
}

/** Главная модель формы */
export interface OphthalmologicalDataDTO {
  specialistData: OphSpecialistDataDTO;
  visualAcuity: OphVisualAcuityDTO;
  perimetry: OphPerimetryDTO;
  intraocularPressure: OphIntraocularPressureDTO;
  eyelids: OphEyelidsDTO;
  eyeballs: OphEyeballsDTO;
  nystagmus: OphNystagmusDTO;
  conjunctiva: OphConjunctivaDTO;
  lacrimalApparatus: OphLacrimalApparatusDTO;
  cornea: OphCorneaDTO;
  sclera: OphScleraDTO;
  anteriorChamber: OphAnteriorChamberDTO;
  pupils: OphPupilsDTO;
  iris: OphIrisDTO;
  vitreousBody: OphVitreousBodyDTO;
  lens: OphLensDTO;
  fundus: OphFundusDTO;
  patientBehavior: OphPatientBehaviorDTO;
  signedInJournal: OphSignedInJournalDTO;
  glassesCorrection: OphGlassesCorrectionDTO;
}
