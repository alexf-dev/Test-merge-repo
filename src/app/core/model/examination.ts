export type Id = number | null;

// export interface ExaminationDirectionDto {
//   directionId: number | null;
// }

export interface Examination {
    id: Id;
    patientId: Id;

    beginDate: string | Date | null;

    regNum: Id;
    actNum: Id;

    placeId: Id;
    disgroupId: Id;
    disreasonId: Id;

    uot: Id;
    upt: Id;

    examDate: string | Date | null;

    actnumNew: string | null;
    regnumNew: string | null;

    historyInform: string | null;
    historyDate: string | Date | null;
    historyName: string | null;

    isRepeat: boolean | null;
    isNotHistory: boolean | null;
    isMigration: boolean | null;
    isAbroad: boolean | null;
    isBaikonur: boolean | null;
    isNao: boolean | null;
    isPurIki: boolean | null;

    hospitalId: Id;
    // directionDtos: ExaminationDirectionDto[];
}

export function emptyExamination(): Examination {
    return {
        id: null,
        patientId: null,

        beginDate: null,

        regNum: null,
        actNum: null,

        placeId: null,
        disgroupId: null,
        disreasonId: null,

        uot: null,
        upt: null,

        examDate: null,

        actnumNew: null,
        regnumNew: null,

        historyInform: null,
        historyDate: null,
        historyName: null,

        isRepeat: null,
        isNotHistory: null,
        isMigration: null,
        isAbroad: null,
        isBaikonur: null,
        isNao: null,
        isPurIki: null,

        hospitalId: null,
        // directionDtos: null,
    };
}
