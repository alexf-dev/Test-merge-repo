/** Модель заключение специалистов ЛПУ */
export interface SpecialistConclusionItemDTO {
    fullName: string;
    specialty: string;
    conclusion: string;
}

export interface SpecialistConclusionDTO {
    specialist1: SpecialistConclusionItemDTO;
    specialist2: SpecialistConclusionItemDTO;
}

export const EMPTY_SPECIALIST_CONCLUSION_ITEM: SpecialistConclusionItemDTO = {
    fullName: '',
    specialty: '',
    conclusion: ''
};
