/** Модель данных формы "Неврологический статус" */

/** Строка "чекбокс + поле справа" */
export interface CheckWithValueDTO {
  checked: boolean;
  value: string;
}

/** Блок "Специалист" */
export interface SpecialistDataDTO {
  specialist: string;
  conclusion: string;
}

/** Блок "Общее состояние" */
export interface GeneralConditionDTO {
  satisfactory: boolean;
  relativelySatisfactory: boolean;
  moderate: boolean;
  severe: boolean;
  extremelySevere: boolean;
}

/** Блок "Сознание" */
export interface ConsciousnessDTO {
  clear: boolean;
  lightStupor: boolean;
  moderateStupor: boolean;
  pronouncedStupor: boolean;
  psychomotorAgitation: boolean;
  comment: string;
}

/** Блок "Реакция на окружающее" */
export interface ReactionToSurroundingsDTO {
  adequate: boolean;
  inadequate: boolean;
  comment: string;
}

/** Строка "Костные деформации черепа" */
export interface SkullDeformitiesDTO {
  checked: boolean;
  comment: string;
}

/** Вложенный блок "Череп" */
export interface DysraphicSkullDTO {
  microcephalic: boolean;
  hydrocephalic: boolean;
  brachycephalic: boolean;
  dolichocephalic: boolean;
  asymmetric: boolean;
  comment: string;
}

/** Вложенный блок "Лицо" */
export interface DysraphicFaceDTO {
  straightLineSlopingForehead: boolean;
  mongoloidEyeSlit: boolean;
  antiMongoloidEyeSlit: boolean;
  hypotelorism: boolean;
  saddleNose: boolean;
  facialAsymmetry: boolean;
  macrognathia: boolean;
  micrognathia: boolean;
  cleftChin: boolean;
  comment: string;
}

/** Вложенный блок "Глаза" */
export interface DysraphicEyesDTO {
  epicanthus: boolean;
  asymmetricEyeSlits: boolean;
  comment: string;
}

/** Пункт "Уши" (без сворачивания) */
export interface DysraphicEarsDTO {
  checked: boolean;
  largeProtruding: boolean;
  smallDeformed: boolean;
  differentSizes: boolean;
  differentlyPositioned: boolean;
  lowPositioned: boolean;
  comment: string;
}

/** Вложенный блок "Шея" */
export interface DysraphicNeckDTO {
  short: boolean;
  long: boolean;
  torticollis: boolean;
  pterygoidFolds: boolean;
  excessiveFolds: boolean;
  comment: string;
}

/** Вложенный блок "Кисти" */
export interface DysraphicHandsDTO {
  brachydactyly: boolean;
  arachnodactyly: boolean;
  syndactyly: boolean;
  transversePalmarCrease: boolean;
  fingerCurvature: boolean;
  comment: string;
}

/** Вложенный блок "Стопы" */
export interface DysraphicFeetDTO {
  brachydactyly: boolean;
  arachnodactyly: boolean;
  syndactyly: boolean;
  toeOverlapping: boolean;
  comment: string;
}

/** Блок "Дизрафический статус" */
export interface DysraphicStatusDTO {
  skull: DysraphicSkullDTO;
  face: DysraphicFaceDTO;
  eyes: DysraphicEyesDTO;
  ears: DysraphicEarsDTO;
  neck: DysraphicNeckDTO;
  hands: DysraphicHandsDTO;
  feet: DysraphicFeetDTO;
  additionalInfo: string;
}

/** Вложенный блок "I пара" черепно-мозговых нервов */
export interface CranialNervePairIDTO {
  anosmia: boolean;
  hyposmia: boolean;
  hyperosmia: boolean;
  dysosmia: boolean;
  olfactoryHallucinations: boolean;
  additionalInfo: string;
}

/** Вложенный блок "II пара" черепно-мозговых нервов */
export interface CranialNervePairIIDTO {
  visualAcuityOD: CheckWithValueDTO;
  visualAcuityOS: CheckWithValueDTO;
  amblyopia: boolean;
  amaurosis: boolean;
  colorVisionPreserved: boolean;
  achromatopsia: boolean;
  dyschromatopsia: boolean;
  scotomas: boolean;
  homonymousHemianopia: CheckWithValueDTO;
  heteronymousHemianopia: CheckWithValueDTO;
  concentricVisualFieldConstriction: boolean;
  fundus: CheckWithValueDTO;
  visualHallucinations: boolean;
  additionalInfo: string;
}

/** Вложенный блок "III, IV, VI пары" черепно-мозговых нервов */
export interface CranialNervePairIIIIVVIDTO {
  ptosis: CheckWithValueDTO;
  exophthalmos: CheckWithValueDTO;
  enophthalmos: CheckWithValueDTO;
  fullEyeMovement: boolean;
  upwardGazeParesis: CheckWithValueDTO;
  downwardGazeParesis: CheckWithValueDTO;
  convergentStrabismus: boolean;
  divergentStrabismus: boolean;
  equalPupils: boolean;
  anisocoria: boolean;
  miosis: CheckWithValueDTO;
  mydriasis: CheckWithValueDTO;
  directPupilLightReaction: CheckWithValueDTO;
  consensualPupilLightReaction: CheckWithValueDTO;
  convergence: CheckWithValueDTO;
  accommodation: CheckWithValueDTO;
  additionalInfo: string;
}

/** Вложенный блок "V пара" черепно-мозговых нервов */
export interface CranialNervePairVDTO {
  jawMovementVolume: CheckWithValueDTO;
  masticatoryMuscleTension: CheckWithValueDTO;
  masticatoryMuscleTrophic: CheckWithValueDTO;
  facialPain: CheckWithValueDTO;
  trigeminalExitPointPain: CheckWithValueDTO;
  facialSkinSensitivity: CheckWithValueDTO;
  additionalInfo: string;
}

/** Вложенный блок "VII пара" черепно-мозговых нервов */
export interface CranialNervePairVIIDTO {
  facialAsymmetry: CheckWithValueDTO;
  nasolabialForeheadFoldsSmoothed: CheckWithValueDTO;
  mouthCornerDropped: CheckWithValueDTO;
  lagophthalmos: CheckWithValueDTO;
  lacrimation: CheckWithValueDTO;
  dryEye: CheckWithValueDTO;
  tasteLossAnteriorTwoThirds: boolean;
  additionalInfo: string;
}

/** Вложенный блок "VIII пара" черепно-мозговых нервов */
export interface CranialNervePairVIIIDTO {
  hearingAcuityD: CheckWithValueDTO;
  hearingAcuityS: CheckWithValueDTO;
  deafness: boolean;
  tinnitus: boolean;
  systemicVertigo: boolean;
  nonSystemicVertigo: boolean;
  nystagmus: CheckWithValueDTO;
  additionalInfo: string;
}

/** Вложенный блок "IX, X пары" черепно-мозговых нервов */
export interface CranialNervePairIXXDTO {
  softPalateDrooping: CheckWithValueDTO;
  uvulaDeviation: CheckWithValueDTO;
  dysphagia: boolean;
  dysphonia: boolean;
  dysarthria: boolean;
  vocalCordParesis: boolean;
  hyposalivation: boolean;
  tasteLossPosteriorOneThird: boolean;
  parasympatheticDenervation: boolean;
  additionalInfo: string;
}

/** Вложенный блок "XI пара" черепно-мозговых нервов */
export interface CranialNervePairXIDTO {
  headRotationDifficulty: CheckWithValueDTO;
  shoulderDropped: CheckWithValueDTO;
  armElevationLimited: CheckWithValueDTO;
  trapeziusSternocleidomastoidTension: CheckWithValueDTO;
  trapeziusSternocleidomastoidTrophic: CheckWithValueDTO;
  congenitalTorticollis: boolean;
  acquiredTorticollis: boolean;
  additionalInfo: string;
}

/** Вложенный блок "XII пара" черепно-мозговых нервов */
export interface CranialNervePairXIIDTO {
  tongueMuscleAtrophy: boolean;
  tongueFibrillations: boolean;
  tongueDeviation: CheckWithValueDTO;
  dysarthria: boolean;
  tongueImmobility: boolean;
  anarthria: CheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Черепно-мозговые нервы" */
export interface CranialNervesDTO {
  noPathology: boolean;
  pairI: CranialNervePairIDTO;
  pairII: CranialNervePairIIDTO;
  pairIIIIVVI: CranialNervePairIIIIVVIDTO;
  pairV: CranialNervePairVDTO;
  pairVII: CranialNervePairVIIDTO;
  pairVIII: CranialNervePairVIIIDTO;
  pairIXX: CranialNervePairIXXDTO;
  pairXI: CranialNervePairXIDTO;
  pairXII: CranialNervePairXIIDTO;
}

/** Блок "Двигательная сфера" */
export interface MotorSphereDTO {
  jointMovementVolume: CheckWithValueDTO;
  muscleStrength: CheckWithValueDTO;
  muscleAtrophy: CheckWithValueDTO;
  muscleHypotrophy: CheckWithValueDTO;
  muscleHypertrophy: CheckWithValueDTO;
  muscleHypertonus: CheckWithValueDTO;
  muscleHypotonus: CheckWithValueDTO;
  muscleAtonia: CheckWithValueDTO;
  monoparesis: CheckWithValueDTO;
  paraparesis: CheckWithValueDTO;
  hemiparesis: CheckWithValueDTO;
  triparesis: CheckWithValueDTO;
  tetraparesis: CheckWithValueDTO;
  monoplegia: CheckWithValueDTO;
  paraplegia: CheckWithValueDTO;
  hemiplegia: CheckWithValueDTO;
  triplegia: CheckWithValueDTO;
  tetraplegia: CheckWithValueDTO;
  fibrillations: CheckWithValueDTO;
  fascicularTwitching: CheckWithValueDTO;
  retractions: CheckWithValueDTO;
  contractures: CheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Сухожильные и надкостичные рефлексы" */
export interface TendonPeriostealReflexesDTO {
  dEqualsS: boolean;
  dGreaterThanSByHemitype: boolean;
  sGreaterThanDByHemitype: boolean;
  normal: boolean;
  increased: boolean;
  uniformlyDecreased: boolean;
  decreasedInDistal: boolean;
  decreased: CheckWithValueDTO;
  mandibular: CheckWithValueDTO;
  supraorbital: CheckWithValueDTO;
  biceps: CheckWithValueDTO;
  triceps: CheckWithValueDTO;
  carporadial: CheckWithValueDTO;
  costabdominal: CheckWithValueDTO;
  scapulohumeral: CheckWithValueDTO;
  pubic: CheckWithValueDTO;
  knee: CheckWithValueDTO;
  achilles: CheckWithValueDTO;
  plantar: CheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Кожные рефлексы" */
export interface SkinReflexesDTO {
  upperAbdominal: CheckWithValueDTO;
  middleAbdominal: CheckWithValueDTO;
  lowerAbdominal: CheckWithValueDTO;
  cremasteric: CheckWithValueDTO;
  anal: CheckWithValueDTO;
  gluteal: CheckWithValueDTO;
  plantar: CheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Рефлексы со слизистых оболочек" */
export interface MucosalReflexesDTO {
  conjunctival: CheckWithValueDTO;
  corneal: CheckWithValueDTO;
  pharyngeal: CheckWithValueDTO;
  palatal: CheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Патологические рефлексы" */
export interface PathologicalReflexesDTO {
  rossolimo: CheckWithValueDTO;
  zhukovsky: CheckWithValueDTO;
  jacobsonLask: CheckWithValueDTO;
  bekhterev1: CheckWithValueDTO;
  bekhterev2: CheckWithValueDTO;
  babinski: CheckWithValueDTO;
  oppenheim: CheckWithValueDTO;
  gordon: CheckWithValueDTO;
  schaeffer: CheckWithValueDTO;
  marinescuRadovici: CheckWithValueDTO;
  handClonus: CheckWithValueDTO;
  footClonus: CheckWithValueDTO;
  patellarClonus: CheckWithValueDTO;
  bekhterevMarieFoix: CheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Патологические синкинезии" */
export interface PathologicalSynkinesiasDTO {
  strumpellTibialPhenomenon: CheckWithValueDTO;
  pronatorSynkinesis: CheckWithValueDTO;
  radialSynkinesis: CheckWithValueDTO;
  raimistSynkinesis: CheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Координация движений" */
export interface CoordinationDTO {
  ataxia: string | null;
  tremor: string | null;
  eyelidFingerTremor: boolean;
  missTargetedMovements: boolean;
  nystagmus: CheckWithValueDTO;
  scannedSpeech: boolean;
  rombergPosition: CheckWithValueDTO;
  fingerNoseTest: CheckWithValueDTO;
  kneeHeelTest: CheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Походка" */
export interface GaitDTO {
  sparing: boolean;
  paretic: boolean;
  steppage: boolean;
  hemiparetic: boolean;
  spasticParetic: boolean;
  atactic: boolean;
  duck: boolean;
  slowSmallSteps: boolean;
  additionalInfo: string;
}

/** Блок "Позвоночник" */
export interface SpineDTO {
  deformities: string | null;
  paravertebralPointPalpation: CheckWithValueDTO;
  radicularPain: CheckWithValueDTO;
  backMuscleTension: CheckWithValueDTO;
  movementVolume: CheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Симптомы натяжения нервных корешков" */
export interface NerveRootTensionSymptomsDTO {
  sittingSymptom: CheckWithValueDTO;
  lasegueSymptom: CheckWithValueDTO;
  wassermanSymptom: CheckWithValueDTO;
  bekhterevSymptom: CheckWithValueDTO;
  mackiewiczSymptom: CheckWithValueDTO;
  neriSymptom: CheckWithValueDTO;
  spinousProcessSymptom: CheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Гиперкинезы" */
export interface HyperkinesiasDTO {
  athetosis: boolean;
  choreicConvulsions: boolean;
  tics: boolean;
  myoclonia: boolean;
  hemiballismus: boolean;
  tremor: boolean;
  torsionSpasm: boolean;
  blepharospasm: boolean;
  facialHemispasm: boolean;
  additionalInfo: string;
}

/** Блок "Типы нарушений чувствительности" */
export interface SensoryDisordersDTO {
  peripheralType: boolean;
  segmentalType: boolean;
  conductorType: boolean;
  corticalType: boolean;
  dissociatedSensoryDisorders: boolean;
  additionalInfo: string;
}

/** Блок "Тазовые расстройства" */
export interface PelvicDisordersDTO {
  urinaryIncontinence: CheckWithValueDTO;
  fecalIncontinence: CheckWithValueDTO;
  urinaryRetention: CheckWithValueDTO;
  fecalRetention: CheckWithValueDTO;
  imperativeUrge: boolean;
  noUrge: boolean;
  impotence: boolean;
  infertility: boolean;
}

/** Блок "Вегетативно-трофическая сфера" */
export interface VegetativeTrophicSphereDTO {
  dermographism: CheckWithValueDTO;
  palmSoleHyperhidrosis: boolean;
  additionalInfo: string;
}

/** Вложенный блок "Психомоторное развитие ребёнка" */
export interface PsychomotorDevelopmentDTO {
  respondsToAuditoryStimuli: CheckWithValueDTO;
  respondsToVisualStimuli: CheckWithValueDTO;
  holdsHead: CheckWithValueDTO;
  sitsWithSupport: CheckWithValueDTO;
  sitsStably: CheckWithValueDTO;
  crawls: CheckWithValueDTO;
  getsOnAllFours: CheckWithValueDTO;
  stands: CheckWithValueDTO;
  walksIndependently: CheckWithValueDTO;
  walksWithSupport: CheckWithValueDTO;
  coos: CheckWithValueDTO;
  babbles: CheckWithValueDTO;
  makesSounds: CheckWithValueDTO;
  understandsAddressedSpeech: CheckWithValueDTO;
  playsWithToys: CheckWithValueDTO;
  eatsDrinksIndependently: CheckWithValueDTO;
  additionalInfo: string;
}

/** Блок "Высшие корковые функции" */
export interface HigherCorticalFunctionsDTO {
  asthenization: CheckWithValueDTO;
  mood: CheckWithValueDTO;
  emotions: CheckWithValueDTO;
  thinking: CheckWithValueDTO;
  speech: CheckWithValueDTO;
  orientation: CheckWithValueDTO;
  contactAccessibility: CheckWithValueDTO;
  memory: CheckWithValueDTO;
  attention: CheckWithValueDTO;
  intelligence: CheckWithValueDTO;
  interests: CheckWithValueDTO;
  behavior: CheckWithValueDTO;
  sleep: CheckWithValueDTO;
  psychomotorDevelopment: PsychomotorDevelopmentDTO;
  additionalInfo: string;
}

/** Главная модель формы */
export interface NeurologicalStatusDTO {
  specialistData: SpecialistDataDTO;
  noFocalPathology: boolean;
  generalCondition: GeneralConditionDTO;
  consciousness: ConsciousnessDTO;
  reactionToSurroundings: ReactionToSurroundingsDTO;
  skullDeformities: SkullDeformitiesDTO;
  dysraphicStatus: DysraphicStatusDTO;
  cranialNerves: CranialNervesDTO;
  motorSphere: MotorSphereDTO;
  tendonPeriostealReflexes: TendonPeriostealReflexesDTO;
  skinReflexes: SkinReflexesDTO;
  mucosalReflexes: MucosalReflexesDTO;
  pathologicalReflexes: PathologicalReflexesDTO;
  pathologicalSynkinesias: PathologicalSynkinesiasDTO;
  coordination: CoordinationDTO;
  gait: GaitDTO;
  spine: SpineDTO;
  nerveRootTensionSymptoms: NerveRootTensionSymptomsDTO;
  hyperkinesias: HyperkinesiasDTO;
  sensoryDisorders: SensoryDisordersDTO;
  pelvicDisorders: PelvicDisordersDTO;
  vegetativeTrophicSphere: VegetativeTrophicSphereDTO;
  higherCorticalFunctions: HigherCorticalFunctionsDTO;
}
