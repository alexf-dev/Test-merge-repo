import {DictionaryValue} from "./dictionary-value";

export class IprDataMedProf {
    id?: number;
    expertOpinionId?: number;
    typeId?: number;
    helpId?: DictionaryValue;
    iprDate?: string;
    deadlineDate?: string;
    recommended?: string;
    fold?: string;
    duration?: string;
    createDate?: string;
    modifyDate?: string;
    empId?: number;
    actN1Id?: number;
    checked?: boolean;
    showBlock?: boolean;
}
