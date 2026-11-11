import {DictionaryValue} from "../../core/model/dictionary-value";

export class DHelp {
    id!: number;
    parId: number | null = null;
    measureId: DictionaryValue | null = null;

    code: string | null = null;
    rname: string | null = null;
    kname: string | null = null;
    ename: string | null = null;
    dateEntry: Date | string | null = null;
    status = false;
    conCode: string | null = null;
    oldHelpCode: string | null = null;
    periodCnt: number | null = null;
}
