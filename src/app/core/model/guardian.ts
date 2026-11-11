import {PersonDto} from "../../dto/gbdfl-person-dto";

export class Guardian {
    id?: number;
    personId?: PersonDto;
    personHistoryId?: number;
    relTypeId?: number;
    workPlace?: string;
    phone?: string;
    isENebdApproved?: boolean;
    isZagsApproved?: boolean;
    isPatronizeApproved?: boolean;
}
