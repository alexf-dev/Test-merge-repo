/**
 * Модель данных блока "Данные дополнительных и лабораторных методов обследования"
 */
export interface AdditionalMethodsDTO {
    kag: string;
    xray: string;
    ultrasound: string;
    abdominalUltrasound: string;
    heartUltrasound: string;
    ecg: string;
    eeg: string;
    other: string;
}

/**
 * Модель данных блока "Общий анализ крови"
 */
export interface BloodTestDTO {
    isNormal: boolean;
    erythrocytes: string;
    hemoglobin: string;
    colorIndex: string;
    hematocrit: string;
    platelets: string;
    leukocytes: string;
    bandNuclear: string;
    segmentedNuclear: string;
    eosinophils: string;
    basophils: string;
    lymphocytes: string;
    monocytes: string;
    esr: string;
    history: string;
}

/**
 * Модель данных блока "Биохимический анализ крови"
 */
export interface BiochemicalBloodTestDTO {
    isNormal: boolean;
    totalProtein: string;
    albumin: string;
    globulins: string;
    fibrinogen: string;
    pti: string;
    alpha1Globulins: string;
    alpha2Globulins: string;
    betaGlobulins: string;
    gammaGlobulins: string;
    thymolTest: string;
    sublimateTest: string;
    suremocoid: string;
    cReactiveProtein: string;
    creatinine: string;
    urea: string;
    sugar: string;
    glucose: string;
    bilirubinTotal: string;
    bilirubinDirect: string;
    bilirubinIndirect: string;
    alt: string;
    ast: string;
    alphaAmylase: string;
    totalCholesterol: string;
    betaLipoproteins: string;
    triglycerides: string;
    calciumSerum: string;
    history: string;
}

/**
 * Модель данных блока "Общий анализ мочи"
 */
export interface UrineTestDTO {
    isNormal: boolean;
    dailyVolume: string;
    specificGravity: string;
    color: string;
    transparency: string;
    ph: string;
    protein: string;
    sugar: string;
    acetone: string;
    ketoneBodies: string;
    urobilinBodies: string;
    bilirubin: string;
    ammonia: string;
    squamousEpitheliumCells: string;
    transitionalEpitheliumCells: string;
    renalEpitheliumCells: string;
    leukocytes: string;
    erythrocytes: string;
    cylinders: string;
    mucus: string;
    bacteria: string;
    inorganicSediment: string;
    history: string;
}

/**
 * Общая модель данных формы "Данные лабораторных исследований"
 */
export interface LaboratoryDataDTO {
    additionalMethods: AdditionalMethodsDTO;
    bloodTest: BloodTestDTO;
    biochemicalBloodTest: BiochemicalBloodTestDTO;
    urineTest: UrineTestDTO;
}
