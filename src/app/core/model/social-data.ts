export type Id = number | null;

export interface SocialData {
    id: Id;

    patientId: Id;

    familyStId: Id;
    socEconomicStId: Id;
    housingId: Id;

    floor: boolean | null;

    isRampant: boolean | null;
    isElevator: boolean | null;
    isHeating: boolean | null;
    isEmployable: boolean | null;

    educationTypeId: Id;
    newProfessionId: Id;
    sectorId: Id;

    workplace: string | null;

    isEmpl2020: boolean | null;

    emplCategory: string | null;

    studyPlace: string | null;

    postnameId: Id;
    qualificId: Id;

    workConditions: string | null;

    chorganizationId: Id;

    isKindergarten: boolean | null;
    isSpecKindergarten: boolean | null;
    isSchool: boolean | null;
    isSpecSchool: boolean | null;
    isHomeSchool: boolean | null;

    workWishId: Id;
    studyWishId: Id;
    harmfulFactors: HarmfulFactorsDto[];
}

export interface HarmfulFactorsDto {
    id: number | null;
    examinationId: number | null;
    factorId: number | null;
    createDate: string | Date | null;
}

export function emptySocialData(): SocialData {
    return {
        id: null, patientId: null,
        familyStId: null, socEconomicStId: null, housingId: null,
        floor: null,
        isRampant: null, isElevator: null, isHeating: null, isEmployable: null,
        educationTypeId: null, newProfessionId: null, sectorId: null,
        workplace: null, isEmpl2020: null, emplCategory: null, studyPlace: null,
        postnameId: null, qualificId: null, workConditions: null, chorganizationId: null,
        isKindergarten: null, isSpecKindergarten: null, isSchool: null, isSpecSchool: null, isHomeSchool: null,
        workWishId: null, studyWishId: null,
        harmfulFactors: [],
    };
}
