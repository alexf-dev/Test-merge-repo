export interface ExpertOpinionRequest {
  id: number | null;
  patientId: number | null;

  nameClassesId: number | null;
  diseaseMkb: number | null;
  mainDiagnosis: string | null;
  relatedDiseasesId: number | null;
  sequela: string | null;
  validity: number | null;

  disabilityGroupId: number | null;
  termReceived: string | null;            // ISO yyyy-MM-dd
  deadlineId: number | null;
  disabEstForPeriodTo: string | null;     // ISO
  reasonDisabilityAccordForm7: number | null;
  reasonforDisability: string | null;

  uotDegree: number | null;
  deadline2Id: number | null;
  termUotReceived: string | null;         // ISO
  uotDegreeSetTo: string | null;          // ISO
  reexaminationDate: string | null;       // ISO

  medicalRehabilation: string | null;
  socialRehabilation: string | null;
  profRehabilation: string | null;
  iprSoc: boolean | null;
  iprMed: boolean | null;
  dynamicObservationId: number | null;
  deadline3Id: number | null;

  goals: { healthStateId: number }[];

  justification: { healthStateId: number }[];
  limitation: { healthStateId: number }[];
  defects: { healthStateId: number }[];
  irreversibleDefects: { healthStateId: number }[];

  uptData: UptDataDto[];

  circulation: CirculationDysDto | null;
  mental: MentalDysDto | null;
  sensor: SensorDysDto | null;
  stato: StatoDysDto | null;

  directionDtos: ExpertopinionDirection[];
}

// ==== UPT ====
export interface UptDataDto {
  aktN1Id: string | null;           // ВАЖНО: строка
  isAdjudicate: boolean | null;
  referenceUpt: string | null;
  degreeOfUptDate: string | null;   // ISO
  deadline2Id: number | null;
  causeUptId: number | null;
  termUptDate: string | null;       // ISO
  degreeUpt: number | null;
  isSelected: boolean | null;
  needsAddForms: string | null;
  emptyField: string | null;
  isDvp: boolean | null;
  conclusionDvp: string | null;
  addHelps: { addHelpId: number }[];
}

// ==== ДТО по дисфункциям ====
export interface CirculationDysDto {
  impairedCirculatory: number | null;
  impairedCirculatoryTxt: string | null;
  respiratoryDysfunction: number | null;
  respiratoryDysTxt: string | null;
  digestiveDysfunction: number | null;
  digestiveDysTxt: string | null;
  allocationDysfunction: number | null;
  allocationDysTxt: string | null;
  dysfunctionMetabolism: number | null;
  dysfunctionMetTxt: string | null;
  hematopoieticDysfunction: number | null;
  hematopoieticDysTxt: string | null;
  dysfunctionInternal: number | null;
  dysfunctionInternalTxt: string | null;
  immunityImpairment: number | null;
  immunityImpairmentTxt: string | null;
  additionalInformation: number | null;
  additionalInformationTxt: string | null;

  circulatoryDysHeart: number | null;
  circulatoryDysBloodvVessels: number | null;
  circulatoryDysBloodPressure: number | null;
  circulatoryDysBloodSystem: number | null;
  circulatoryDysBreath: number | null;

  respiratoryDysBreath: number | null;

  digestiveDysDefecation: number | null;

  allocationDysDefecation: number | null;
  allocationDysUrination: number | null;

  metabolismDysGeneralMetabolic: number | null;
  metabolismDysEndocoryneGlands: number | null;
  internalSecretionDysGeneralMetabolic: number | null;
  internalSecretionDysEndocoryneGlands: number | null;

  immunityImpairmentDysImmunity: number | null;
  immunityImpairmentDysEndocoryneGlands: number | null;
}

export interface MentalDysDto {
  perceptionId: number | null;
  attentionId: number | null;
  memoryId: number | null;
  thinkingId: number | null;
  speechId: number | null;
  emotionId: number | null;
  willId: number | null;
  intelligenceId: number | null;
  consciousnessId: number | null;
  behaviorId: number | null;
  psychomotorId: number | null;
}

export interface SensorDysDto {
  visionId: number | null;
  hearingId: number | null;
  smellId: number | null;
  touchId: number | null;
  sensitivityDisordersId: number | null;
}

export interface StatoDysDto {
  motorFunctionsHead: number | null;
  torso: number | null;
  limbs: number | null;
  statics: number | null;
  coordinationMovements: number | null;

  headJoint: number | null;
  headMuscleStrength: number | null;
  headInvoluntaryMotorForce: number | null;
  headVoluntaryMotorForce: number | null;

  torsoJoint: number | null;
  torsoMuscleStrength: number | null;
  torsoInvoluntaryMotorForce: number | null;
  torsoVoluntaryMotorForce: number | null;

  limbsJoint: number | null;
  limbsMuscleStrength: number | null;
  limbsInvoluntaryMotorForce: number | null;
  limbsVoluntaryMotorForce: number | null;

  limbsMuscleTone: number | null;
  limbsMotorReflex: number | null;
  limbsHeadAndNeckArea: number | null;
  limbsTorso: number | null;
  limbsUpperLimbs: number | null;
  limbsLowerLimbs: number | null;
  limbsShoulderArea: number | null;
  limbsPelvicArea: number | null;

  coordinationMuscleTone: number | null;
  coordinationInvoluntaryMotorForce: number | null;
  coordinationVoluntaryMotorForce: number | null;

  staticsJoint: number | null;
  staticsMuscleStrength: number | null;
  staticsVoluntaryMotorForce: number | null;
}

export interface ExpertopinionDirection {
  directionId: number | null;
}

