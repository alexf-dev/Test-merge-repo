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

/** Блок "Зев" */
export interface PharynxDTO {
  pinkClean: boolean;
  loose: boolean;
  hyperemic: boolean;
}

/** Блок "Волосы/ногти" */
export interface HairNailsDTO {
  malePatternHair: CheckComment;
  splitEnds: CheckComment;
  brittleNails: CheckComment;
  femalePatternHair: CheckComment;
  hairLoss: CheckComment;
  hairLossAdditionalInfo: string;
}

/** Блок "Подкожно-жировая клетчатка" */
export interface SubcutaneousFatDTO {
  weaklyDeveloped: boolean;
  moderatelyDeveloped: boolean;
  excessivelyDeveloped: boolean;
  pastiness: string;
}

/** Вложенный подблок "Увеличены" (лимфоузлы) */
export interface EnlargedLymphNodesDTO {
  submandibular: boolean;
  cervical: boolean;
  supraclavicular: boolean;
  infraclavicular: boolean;
  axillary: boolean;
  elbow: boolean;
}

/** Блок "Периферические лимфатические узлы" */
export interface LymphNodesDTO {
  notEnlarged: boolean;
  painless: boolean;
  enlarged: EnlargedLymphNodesDTO;
  painful: boolean;
  notMatted: boolean;
  matted: CheckComment;
  mattedAdditionalInfo: string;
}

/** Пункт "Суставы" */
export interface JointsDTO {
  enlargedInVolume: boolean;
  deformation: CheckComment;
  spindleShaped: boolean;
  painOnPalpation: CheckComment;
  limitedRangeOfMotion: CheckComment;
  fluctuation: CheckComment;
  lameness: boolean;
  inguinalFoldsSmoothed: boolean;
  thighAdductedAndFlexed: boolean;
  ankyloses: CheckComment;
}

/** Пункт "Конфигурация/кожа/движения" */
export interface JointConfigurationDTO {
  normalConfiguration: boolean;
  skinShiny: boolean;
  contoursSmoothed: CheckComment;
  swelling: CheckComment;
  painOnTapping: CheckComment;
  drumstickFingers: CheckComment;
  movementsFullRange: CheckComment;
  crepitus: CheckComment;
  contractures: CheckComment;
  patellaBallottement: boolean;
  legDragging: boolean;
  legForcedPosition: boolean;
  legBentAtKnee: boolean;
}

/** Вложенный подблок "Позвоночник" */
export interface SpineDTO {
  painOnBending: CheckComment;
  limitedMovement: CheckComment;
  spinousProcessProtrusion: CheckComment;
  hump: CheckComment;
  coldAbscesses: CheckComment;
  fistulas: CheckComment;
  reinSymptom: CheckComment;
  deformationType: string | null;
}

/** Блок "Опорно-двигательный аппарат" */
export interface MusculoskeletalDTO {
  visuallyUnchanged: boolean;
  joints: JointsDTO;
  jointConfiguration: JointConfigurationDTO;
  spine: SpineDTO;
}

/** Пункт "Степень развития мышц" */
export interface MuscleDevelopmentDTO {
  weaklyDeveloped: boolean;
  satisfactorilyDeveloped: boolean;
  wellDeveloped: boolean;
}

/** Пункт "Мышечный трофик" */
export interface MuscleTrophicDTO {
  atrophy: CheckComment;
  hypertrophy: CheckComment;
}

/** Пункт "Мышечный тонус" */
export interface MuscleToneDTO {
  hypotonia: CheckComment;
  hypertonia: CheckComment;
  myotonia: CheckComment;
}

/** Блок "Мышечная система" */
export interface MuscularSystemDTO {
  development: MuscleDevelopmentDTO;
  trophic: MuscleTrophicDTO;
  tone: MuscleToneDTO;
  toneAdditionalInfo: string;
}

/** Блок "Костно-мышечная система" */
export interface BoneMuscleSystemDTO {
  noDeformations: boolean;
  deformation: CheckComment;
  dolichocephalic: boolean;
  brachycephalic: boolean;
  towerSkull: boolean;
  mesocrania: boolean;
  microcephaly: boolean;
  hydrocephaly: boolean;
  craniostenosis: boolean;
  additionalInfo: string;
  largeFontanel: string;
}

/** Блок "Щитовидная железа" */
export interface ThyroidGlandDTO {
  notPalpable: boolean;
  enlarged: CheckComment;
  painless: CheckComment;
  painful: boolean;
  neckShape: string;
  neckShapeAdditionalInfo: string;
}

/** Вложенный подблок "Перкуторно над легкими" */
export interface LungPercussionDTO {
  clearPulmonary: boolean;
  dullSound: CheckComment;
  tympanicSound: CheckComment;
  flatSound: boolean;
  boxSound: CheckComment;
  additionalInfo: string;
}

/** Подблок "Характер" (кашель) */
export interface CoughCharacterDTO {
  dry: boolean;
  moistNonProductive: boolean;
  moistProductive: boolean;
}

/** Подблок "Время появления кашля" */
export interface CoughTimingDTO {
  morning: boolean;
  evening: boolean;
  night: boolean;
}

/** Подблок "Характер мокроты" */
export interface SputumCharacterDTO {
  mucous: boolean;
  serous: boolean;
  purulent: boolean;
  mucopurulent: boolean;
  seropurulent: boolean;
  bloodyStreaks: boolean;
  bloodyClots: boolean;
  rusty: boolean;
}

/** Подблок "Цвет мокроты" */
export interface SputumColorDTO {
  colorless: boolean;
  whitishMucous: boolean;
  greenish: boolean;
  yellow: boolean;
  brown: boolean;
  pink: boolean;
  additionalInfo: string;
}

/** Подблок "Запах мокроты" */
export interface SputumOdorDTO {
  absent: boolean;
  musty: boolean;
  putrid: boolean;
  foul: boolean;
  additionalInfo: string;
}

/** Подблок "Кровохарканье" */
export interface HemoptysisDTO {
  constant: boolean;
  rare: boolean;
  frequent: boolean;
}

/** Подблок "Кровохарканье выраженно" */
export interface HemoptysisSeverityDTO {
  significant: boolean;
  moderate: boolean;
  insignificant: boolean;
}

/** Вложенный подблок "Дыхание над легкими" */
export interface LungBreathingDTO {
  vesicular: CheckComment;
  bronchial: CheckComment;
  harsh: CheckComment;
  dryRales: CheckComment;
  crepitation: CheckComment;
  weakening: CheckComment;
  mixed: CheckComment;
  noRales: CheckComment;
  moistRales: CheckComment;
  pleuralFrictionRub: CheckComment;
  additionalInfo: string;
  coughCharacter: CoughCharacterDTO;
  coughTiming: CoughTimingDTO;
  sputumAmount: string;
  sputumCharacter: SputumCharacterDTO;
  sputumColor: SputumColorDTO;
  sputumOdor: SputumOdorDTO;
  hemoptysis: HemoptysisDTO;
  hemoptysisSeverity: HemoptysisSeverityDTO;
}

/** Блок "Система органов дыхания" */
export interface RespiratorySystemDTO {
  aphonia: boolean;
  hoarseness: boolean;
  huskiness: boolean;
  nasalVoice: boolean;
  nasalBreathing: boolean;
  openMouthBreathing: boolean;
  nasalWingsParticipation: boolean;
  accessoryMusclesParticipation: boolean;
  respiratoryRate: string;
  thoraxType: string | null;
  dyspneaType: string | null;
  suffocation: boolean;
  suffocationAdditionalInfo: string;
  percussion: LungPercussionDTO;
  breathing: LungBreathingDTO;
}

/** Вложенный подблок "Одышка" (сердечно-сосудистая система) */
export interface CardioDyspneaDTO {
  atRest: boolean;
  onPhysicalLoad: boolean;
  onExcitement: boolean;
  additionalInfo: string;
}

/** Вложенный подблок "Кошачье мурлыканье" */
export interface CatPurrDTO {
  overHeartApex: boolean;
  overAorta: boolean;
  overPulmonaryArtery: boolean;
}

/** Вложенный подблок "Границы относительной тупости сердца" */
export interface HeartBordersDTO {
  withinNormalRange: boolean;
  upper: CheckComment;
  right: CheckComment;
  left: CheckComment;
}

/** Вложенный подблок "Тоны сердца" */
export interface HeartSoundsDTO {
  clear: boolean;
  muffled: boolean;
  accentIIOnPulmonaryArtery: boolean;
  systolicMurmur: boolean;
  subdued: boolean;
  accentIIOnAorta: boolean;
  rhythmic: boolean;
  diastolicMurmur: boolean;
  additionalInfo: string;
}

/** Вложенный подблок "Аритмия" */
export interface ArrhythmiaDTO {
  tachycardia: boolean;
  bradycardia: boolean;
  extrasystole: boolean;
  atrialFibrillation: boolean;
  paroxysmalTachycardia: boolean;
  additionalInfo: string;
}

/** Вложенный подблок "Пульс" */
export interface PulseDTO {
  rhythmic: boolean;
  arrhythmic: CheckComment;
  ratePerMinute: CheckComment;
  additionalInfo: string;
}

/** Блок "Сердечно-сосудистая система" */
export interface CardiovascularSystemDTO {
  dyspnea: CardioDyspneaDTO;
  cardiacHump: string;
  apicalImpulse: string;
  cardiacImpulse: string;
  carotidDance: string;
  mussiSymptom: string;
  capillaryPulse: string;
  venousPulse: string;
  epigastricPulsation: string;
  catPurr: CatPurrDTO;
  peripheralVesselsPulsation: string;
  heartBorders: HeartBordersDTO;
  heartSounds: HeartSoundsDTO;
  heartRate: CheckComment;
  arrhythmia: ArrhythmiaDTO;
  firstSoundSplitting: CheckComment;
  gallopRhythm: CheckComment;
  systolicMurmur: CheckComment;
  secondSoundSplitting: CheckComment;
  quailRhythm: CheckComment;
  diastolicMurmur: CheckComment;
  bloodPressure: string;
  pulse: PulseDTO;
}

/** Вложенный подблок "Язык" */
export interface TongueDTO {
  moist: boolean;
  dry: boolean;
  clean: boolean;
  coated: CheckComment;
}

/** Вложенный подблок второго уровня "Болезненный" (живот) */
export interface AbdomenPainDTO {
  inEpigastrium: boolean;
  inRightHypochondrium: boolean;
  inLeftHypochondrium: boolean;
  aroundNavel: boolean;
  abovePubis: boolean;
  inRightIliacRegion: boolean;
  inLeftIliacRegion: boolean;
}

/** Вложенный подблок "Живот" */
export interface AbdomenDTO {
  soft: boolean;
  painless: boolean;
  tense: boolean;
  normalSize: boolean;
  distended: boolean;
  enlargedDueToAscites: boolean;
  anteriorVeinsDilatation: boolean;
  painful: AbdomenPainDTO;
}

/** Вложенный подблок "Печень" */
export interface LiverDTO {
  notPalpable: boolean;
  alongCostalArch: boolean;
  protrudesFromRightHypochondrium: CheckComment;
  painful: boolean;
  painless: boolean;
  marginType: string | null;
  additionalInfo: string;
}

/** Вложенный подблок второго уровня "Размеры" (селезенка) */
export interface SpleenDimensionsDTO {
  transverse: string;
  longitudinal: string;
}

/** Вложенный подблок "Селезенка" */
export interface SpleenDTO {
  palpable: boolean;
  notPalpable: boolean;
  dimensions: SpleenDimensionsDTO;
}

/** Вложенный подблок "Физиологические отправления" */
export interface PhysiologicalFunctionsDTO {
  regular: boolean;
  constipationTendency: boolean;
  diarrheaTendency: boolean;
  additionalInfo: string;
}

/** Блок "Система органов пищеварения" */
export interface DigestiveSystemDTO {
  tongue: TongueDTO;
  abdomen: AbdomenDTO;
  liver: LiverDTO;
  spleen: SpleenDTO;
  physiologicalFunctions: PhysiologicalFunctionsDTO;
}

/** Вложенный подблок "Отёки локализованы" */
export interface LocalizedEdemaDTO {
  onFace: boolean;
  onEyelids: boolean;
  onTrunk: boolean;
  onAbdomen: boolean;
  onLegs: boolean;
  additionalInfo: string;
}

/** Вложенный подблок "Суточный диурез" */
export interface DailyDiuresisDTO {
  adequate: boolean;
  polyuria: boolean;
  oliguria: boolean;
  anuria: boolean;
  nocturia: boolean;
  ischuria: boolean;
  pollakiuria: boolean;
  enuresis: boolean;
  additionalInfo: string;
}

/** Вложенный подблок второго уровня "Симптом поколачивания" (почки) */
export interface PercussionSymptomDTO {
  positive: CheckComment;
  negative: CheckComment;
  additionalInfo: string;
}

/** Вложенный подблок "Почки" */
export interface KidneysDTO {
  percussionSymptom: PercussionSymptomDTO;
}

/** Блок "Система мочеотделения" */
export interface UrinarySystemDTO {
  freePainlessUrination: boolean;
  painfulUrination: boolean;
  urinaryIncontinence: boolean;
  localizedEdema: LocalizedEdemaDTO;
  dailyDiuresis: DailyDiuresisDTO;
  kidneys: KidneysDTO;
  peripheralVesselsPulsation: string;
}
