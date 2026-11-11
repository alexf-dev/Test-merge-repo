/** Блок "Специалист" */
export interface SpecialistDataDTO {
  specialist: string;
  conclusion: string;
}

/** Блок "Данные за хирургическую патологию" */
export interface SurgicalPathologyDataDTO {
  hasSurgicalPathology: boolean;
}

/** Блок "Общее состояние" */
export interface GeneralConditionDTO {
  satisfactory: boolean;
  relativelySatisfactory: boolean;
  moderate: boolean;
  severe: boolean;
  extremelySevere: boolean;
}

/** Блок "Передвижение" */
export interface MobilityDTO {
  independent: boolean;
  withCane: boolean;
  withCrutches: boolean;
  wheelchair: boolean;
  supportOnInjuredLimb: boolean;
  comment: string;
}

/** Блок "Кожные покровы и видимые слизистые" */
export interface SkinMucousDTO {
  normal: boolean;
  normalComment: string;
}

/** Пункт "Степень развития мышц" */
export interface MuscleDevelopmentDTO {
  weaklyDeveloped: boolean;
  satisfactorilyDeveloped: boolean;
  wellDeveloped: boolean;
}

/** Пункт "Мышечный тонус" */
export interface MuscleToneDTO {
  atrophyChecked: boolean;
  atrophy: string;
  hypertrophyChecked: boolean;
  hypertrophy: string;
  hypotoniaChecked: boolean;
  hypotonia: string;
  hypertoniaChecked: boolean;
  hypertonia: string;
  myotoniaChecked: boolean;
  myotonia: string;
}

/** Блок "Мышечная система" */
export interface MuscularSystemDTO {
  development: MuscleDevelopmentDTO;
  tone: MuscleToneDTO;
}

/** Блок "Костная система" */
export interface BoneSystemDTO {
  deformationChecked: boolean;
  deformation: string;
  noDeformation: boolean;
}

/** Блок "Суставы" */
export interface JointsDTO {
  normalConfiguration: boolean;
  fullRangeOfMotion: boolean;
  swellingChecked: boolean;
  swelling: string;
  painChecked: boolean;
  pain: string;
  limitedMotionChecked: boolean;
  limitedMotion: string;
  crepitusChecked: boolean;
  crepitus: string;
  fluctuationChecked: boolean;
  fluctuation: string;
  contracturesChecked: boolean;
  contractures: string;
  ankylosesChecked: boolean;
  ankyloses: string;
  limitedAbductionChecked: boolean;
  limitedAbduction: string;
  clickSymptomChecked: boolean;
  clickSymptom: string;
  skinFoldAsymmetryChecked: boolean;
  skinFoldAsymmetry: string;
  limbShorteningChecked: boolean;
  limbShortening: string;
  externalRotationChecked: boolean;
  externalRotation: string;
  comment: string;
}

/** Вложенный блок "Увеличены" (лимфоузлы) */
export interface EnlargedLymphNodesDTO {
  submandibular: boolean;
  cervical: boolean;
  supraclavicular: boolean;
  infraclavicular: boolean;
  elbow: boolean;
  axillary: boolean;
  inguinal: boolean;
}

/** Блок "Периферические лимфатические узлы" */
export interface LymphNodesDTO {
  notPalpable: boolean;
  notEnlarged: boolean;
  enlarged: EnlargedLymphNodesDTO;
  mobile: boolean;
  painfulChecked: boolean;
  painful: string;
  notMatted: boolean;
  matted: boolean;
  dense: boolean;
  additionalInfo: string;
}

/** Блок "Система дыхания" */
export interface RespiratorySystemDTO {
  vesicularBreathing: boolean;
  lungRalesChecked: boolean;
  lungRales: string;
  clearPercussion: boolean;
  dullPercussionChecked: boolean;
  dullPercussion: string;
  additionalInfo: string;
}

/** Блок "Сердечно сосудистая система" */
export interface CardiovascularSystemDTO {
  heartSoundsChecked: boolean;
  heartSounds: string;
  bloodPressureChecked: boolean;
  bloodPressure: string;
  rhythmicPulse: boolean;
  pulseRateChecked: boolean;
  pulseRate: string;
  additionalInfo: string;
}

/** Блок "Желудочно-кишечный тракт" */
export interface GastrointestinalTractDTO {
  tongueCleanMoist: boolean;
  tongueCoatedChecked: boolean;
  tongueCoated: string;
  abdomenSoft: boolean;
  abdomenDistended: boolean;
  postoperativeScarChecked: boolean;
  postoperativeScar: string;
  abdomenPainless: boolean;
  abdomenPainfulInChecked: boolean;
  abdomenPainfulIn: string;
  umbilicalHernia: boolean;
  inguinalHerniaChecked: boolean;
  inguinalHernia: string;
  femoralHerniaChecked: boolean;
  femoralHernia: string;
  lineaAlbaHerniaChecked: boolean;
  lineaAlbaHernia: string;
  rectusDiastasisChecked: boolean;
  rectusDiastasis: string;
  liverNotPalpable: boolean;
  liverProtrudesChecked: boolean;
  liverProtrudes: string;
  spleenNotPalpable: boolean;
  stoolNormal: boolean;
  stoolUnstable: boolean;
  spasticConstipation: boolean;
  atonicConstipation: boolean;
}

/** Блок "Мочеполовая система" */
export interface UrogenitalSystemDTO {
  edemaChecked: boolean;
  edema: string;
  percussionSymptomChecked: boolean;
  percussionSymptom: string;
  normalUrination: boolean;
  painfulUrination: boolean;
  additionalInfo: string;
}

/** Блок "Локальный статус" */
export interface LocalStatusDTO {
  description: string;
}

/** Блок "Нарушение функций органа или области" */
export interface OrganFunctionImpairmentDTO {
  organSize: string;
  spread: string;
  boundaries: string;
  immobilization: string;
  fixationDevice: string;
  pathologicalMobility: string;
  deformation: string;
  hypotrophy: string;
  atrophy: string;
  woundSize: string;
  fistulaSize: string;
  woundDischarge: string;
  peripheralVesselPulsation: string;
  trophicChanges: string;
}

/** Полная модель формы "Хирургический статус" */
export interface SurgicalStatusDTO {
  specialistData: SpecialistDataDTO;
  surgicalPathologyData: SurgicalPathologyDataDTO;
  generalCondition: GeneralConditionDTO;
  mobility: MobilityDTO;
  skinMucous: SkinMucousDTO;
  muscularSystem: MuscularSystemDTO;
  boneSystem: BoneSystemDTO;
  joints: JointsDTO;
  lymphNodes: LymphNodesDTO;
  respiratorySystem: RespiratorySystemDTO;
  cardiovascularSystem: CardiovascularSystemDTO;
  gastrointestinalTract: GastrointestinalTractDTO;
  urogenitalSystem: UrogenitalSystemDTO;
  localStatus: LocalStatusDTO;
  organFunctionImpairment: OrganFunctionImpairmentDTO;
}
