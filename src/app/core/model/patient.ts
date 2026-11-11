import {DictionaryValue} from "./dictionary-value";
import {PersonDto} from "../../dto/gbdfl-person-dto";
import {Declaration} from "./declaration";

export interface Patient {
    id: number | null;
    personId: PersonDto | null;
    personHistoryId: PersonDto | null;
    num: number | null;
    isCompleted: boolean | null;
    mseCodeId: string | null;
    empId: number | null;
    isActive: boolean | null;
    createDate: string | null;
    isTown: boolean | null;
    sicid: number | null;
    isHasGuardian: boolean | null;
    factAddress: string | null;
    actClose: DictionaryValue | null;
    zNewForm031Id: number | null;
    courtNum: string | null;
    courtDate: string | null;
    phone: string | null;
    districtId: number | null;
    declarationId: Declaration | null;
}
