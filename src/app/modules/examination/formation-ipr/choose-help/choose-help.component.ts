import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MessageService, TreeNode} from "primeng/api";
import {DHelp} from "../../../../dto/dictionary/DHelp";
import {buildTree} from "../../../../shared/tree-utils";
import {TranslationService} from "../../../../core/service/translation.service";
import {Expertopinion} from "../../../../core/model/expertopinion";
import {CamundaService} from "../../../../core/service/camunda.service";
import {DictionaryService} from "../../../../core/service/dictionary.service";

@Component({
    selector: 'app-choose-help',
    templateUrl: './choose-help.component.html',
    styleUrl: './choose-help.component.css'
})
export class ChooseHelpComponent implements OnChanges {
    @Input() visible = true;
    @Input() patientId!: number;
    @Input() lang: string;
    @Input() expertOpinion: Expertopinion;
    @Output() confirm = new EventEmitter<DHelp[]>();
    @Output() cancel = new EventEmitter<void>();

    dHelps: DHelp[];
    query = '';
    allNodes: TreeNode[] = [];
    filteredNodes: TreeNode[] = [];
    iprDataBefore: any[];
    isPens: any;
    expandAll = true;
    disableParentSelection = true;

  private _selection: TreeNode[] = [];

  get selection(): TreeNode[] {
    return this._selection;
  }

  set selection(value: TreeNode | TreeNode[]) {
    this._selection = Array.isArray(value) ? value : (value ? [value] : []);
  }

    constructor(private translationService: TranslationService, private messageService: MessageService, private camundaService: CamundaService, private dictionaryService: DictionaryService) {
    }

    ngOnChanges(): void {
        this.dictionaryService.loadDHelp('d-help').subscribe(res => {
            this.dHelps = res;
        });

        this.rebuild();
    }

    applyFilter(): void {
        const q = this.query.trim().toLowerCase();
        this.filteredNodes = this.filterTree(this.allNodes, q);
    }

    selectedIds(): string[] {
        return (this.selection ?? [])
            .filter(n => !n.children?.length)
            .map(n => String(n.data?.id ?? n.key));
    }

    onAdd(): void {
        const selectedRaw: DHelp[] = (this.selection ?? [])
            .filter(n => !n.children?.length)
            .map(n => n.data as DHelp)
            .filter(Boolean);
        this.confirm.emit(selectedRaw);
        this.visible = false;
    }

    onCancel(): void {
        this.visible = false;
        this.cancel.emit();
    }

    rebuild() {
        this.allNodes = buildTree(this.dHelps, this.lang, {
            expandAll: this.expandAll,
            disableParentSelection: this.disableParentSelection,
            sort: true,
            groupOrphans: true
        });
        this.applyFilter();
        this.selection = [];
    }

  onNodeSelect(event: { node: TreeNode }) {
    const node = event.node;
    if (this.isItemDisabled(node)) {
      this.selection = this.selection.filter(n => n.key !== node.key);
    }
  }

    isInActIprs(id) {
        let ret = false;
        if (this.iprDataBefore != null) {
            if (this.iprDataBefore.includes(id)) {
                ret = true;
            }
        }
        return ret;
    }

    isInlistOrSelectedIdArr(iddArr, id) {
        let arr = [...iddArr];
        if (id) {
            if (arr.findIndex(item => item === id) > -1) {
                arr.splice(arr.findIndex(item => item === id), 1);
            }
        }
        let ret = false;
        for (let i = 0; i < arr.length; i++) {
            /*ret = this.selection(arr[i]);
            if(ret == true){
                break;
            }*/
        }
        if (this.isInActIprs(id)) {
            ret = true;
        }
        return ret;
    }

    isSelectedItem(id) {
        let ret = false;
        if (this.iprDataBefore?.length > 0
            && this.iprDataBefore.findIndex(item => item.help.id === id && item.status !== 3) > -1) {
            ret = true;
        }
        if (this.selection?.length > 0
            && this.selection.findIndex(item => item.key === id) > -1) {
            ret = true;
        }
        if (this.dHelps?.length > 0
            && this.dHelps.findIndex(item => item.id === id) > -1) {
            ret = true;
        }
        return ret;
    }

    isInlistOrSelctedIdArr(iddArr, id) {
        let arr = [...iddArr];
        if (id) {
            if (arr.findIndex(item => item === id) > -1) {
                arr.splice(arr.findIndex(item => item === id), 1);
            }
        }
        let ret = false;
        for (let i = 0; i < arr.length; i++) {
            ret = this.isSelectedItem(arr[i]);
            if (ret == true) {
                break;
            }
        }
        if (this.isInActIprs(id)) {
            ret = true;
        }
        return ret;
    }

    isItemDisabled(node) {
        let age = 62;
        let id = node.key;
        if (id == 591 ||
            id == 592 ||
            id == 594 ||
            id == 146 ||
            id == 147 ||
            id == 217 ||
            id == 225 ||
            id == 226 ||
            id == 227 ||
            id == 250 ||
            id == 260 ||
            id == 261 ||
            id == 249 ||
            id == 263 ||
            id == 264 ||
            id == 491 ||
            id == 360 ||
            id == 361 ||
            id == 595
        ) {
            if (!(this.expertOpinion.disabilityGroupId == 1 ||
                this.expertOpinion.disabilityGroupId == 2 ||
                this.expertOpinion.disabilityGroupId == 6 ||
                this.expertOpinion.disabilityGroupId == 7 ||
                this.expertOpinion.disabilityGroupId == 4 ||
                this.expertOpinion.disabilityGroupId == 9
            )) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для первой, второй группы и ребенку с инвалидностью',
                });
                return true;
            }

        }
        if (id == 381
        ) {
            if (!(this.expertOpinion.disabilityGroupId == 1)
            ) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для первой группы',
                });
                return true;
            }
        }
        if (id == 257
        ) {
            if (!((this.expertOpinion.disabilityGroupId == 1 ||
                    this.expertOpinion.disabilityGroupId == 2)
            )) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для первой и второй группы',
                });
                return true;
            }
        }
        if (id == 556 ||
            id == 234 ||
            id == 235 ||
            id == 554 ||
            id == 555 ||
            id == 494) {
            if (!((this.expertOpinion.disabilityGroupId == 1 ||
                    this.expertOpinion.disabilityGroupId == 4 ||
                    this.expertOpinion.disabilityGroupId == 9 ||
                    this.expertOpinion.disabilityGroupId == 6)
            )) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для первой группы и ребенку с инвалидностью',
                });
                return true;
            }
        }
        if (id == 149 ||
            id == 228 ||
            id == 230 ||
            id == 233
        ) {
            if (!((this.expertOpinion.disabilityGroupId == 1 ||
                    this.expertOpinion.disabilityGroupId == 2 ||
                    this.expertOpinion.disabilityGroupId == 6 ||
                    this.expertOpinion.disabilityGroupId == 7)
            )) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для первой и второй группы',
                });
                return true;
            }
        }
        if (id == 229
        ) {
            if (!((this.expertOpinion.disabilityGroupId == 1 ||
                    this.expertOpinion.disabilityGroupId == 2 ||
                    this.expertOpinion.disabilityGroupId == 6 ||
                    this.expertOpinion.disabilityGroupId == 7 ||
                    this.expertOpinion.disabilityGroupId == 8)
            )) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для первой и второй группы',
                });
                return true;
            }
        }

        if (id == 222 ||
            id == 223 ||
            id == 551 ||
            id == 552 ||
            id == 332 ||
            id == 224
        ) {
            if (!((this.expertOpinion.disabilityGroupId == 1 ||
                    this.expertOpinion.disabilityGroupId == 6)
            )) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для первой группы',
                });
                return true;
            }
        }
        if (id == 331 ||
            id == 106) {
            if (!(this.expertOpinion.disabilityGroupId == 4 ||
                this.expertOpinion.disabilityGroupId == 9)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для ребенку с инвалидностью',
                });
                return true;
            }
        }
        if (id == 35 ||
            id == 36) {
            if (!(this.expertOpinion.disabilityGroupId == 4 ||
                this.expertOpinion.disabilityGroupId == 9 ||
                this.expertOpinion.disabilityGroupId == 7 ||
                this.expertOpinion.disabilityGroupId == 8)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для детей второй, третий группы и ребенку с инвалидностью',
                });
                return true;
            }
        }
        if (id == 39 ||
            id == 40) {
            if (!(this.expertOpinion.disabilityGroupId == 2 ||
                this.expertOpinion.disabilityGroupId == 3)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для взрослых второй и третий группы',
                });
                return true;
            }
        }

        if (id == 31
        ) {
            if (!((this.expertOpinion.disabilityGroupId == 7 ||
                    this.expertOpinion.disabilityGroupId == 4 ||
                    this.expertOpinion.disabilityGroupId == 9)
            )) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для детей второй группы и ребенку с инвалидностью',
                });
                return true;
            }
        }

        if (id == 33
        ) {
            if (!(this.expertOpinion.disabilityGroupId == 2
            )) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для взрослых второй группы',
                });
                return true;
            }
        }
        if (id == 43 ||
            id == 46) {
            if (!(this.expertOpinion.disabilityGroupId == 4 ||
                this.expertOpinion.disabilityGroupId == 9 ||
                this.expertOpinion.disabilityGroupId == 2 ||
                this.expertOpinion.disabilityGroupId == 3 ||
                this.expertOpinion.disabilityGroupId == 7 ||
                this.expertOpinion.disabilityGroupId == 8)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи не разробатывается для первой группы',
                });
                return true;
            }

        }
        if (id == 231 ||
            id == 232
        ) {
            if (!((this.expertOpinion.disabilityGroupId == 1 ||
                    this.expertOpinion.disabilityGroupId == 2 ||
                    this.expertOpinion.disabilityGroupId == 6 ||
                    this.expertOpinion.disabilityGroupId == 7) && age >= 16
            )) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для первой и второй группы старше 16 лет',
                });
                return true;
            }
        }
        if (id == 237
        ) {
            if (!((this.expertOpinion.disabilityGroupId == 1 ||
                    this.expertOpinion.disabilityGroupId == 6) && age >= 14
            )) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для первой группы старше 14 лет',
                });
                return true;
            }
        }
        if (id == 92 ||
            id == 510
        ) {
            if (!((this.expertOpinion.disabilityGroupId == 6 ||
                    this.expertOpinion.disabilityGroupId == 7 ||
                    this.expertOpinion.disabilityGroupId == 8 ||
                    this.expertOpinion.disabilityGroupId == 4 ||
                    this.expertOpinion.disabilityGroupId == 9)
            )) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен только для детей',
                });
                return true;
            }
        }
        if (id == 511 ||
            id == 512
        ) {
            if (!((this.expertOpinion.disabilityGroupId == 1 ||
                    this.expertOpinion.disabilityGroupId == 2 ||
                    this.expertOpinion.disabilityGroupId == 3)
            )) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для взрослых',
                });
                return true;
            }
        }
        if (id == 219 ||
            id == 599
        ) {
            if (!(
                this.expertOpinion.disabilityGroupId == 6 ||
                (this.expertOpinion.disabilityGroupId == 1 && this.isPens == 0)
            )) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для первой группы',
                });
                return true;
            }
        }

        if (id == 204
        ) {
            if (this.isPens == 1) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен до пенсионного возроста',
                });
                return true;
            }
        }
        if (id == 220) {
            if (!(
                (this.expertOpinion.disabilityGroupId == 6 ||
                    this.expertOpinion.disabilityGroupId == 7 ||
                    this.expertOpinion.disabilityGroupId == 4 ||
                    this.expertOpinion.disabilityGroupId == 9
                ) ||
                (
                    (this.expertOpinion.disabilityGroupId == 1 ||
                        this.expertOpinion.disabilityGroupId == 2
                    ) && this.isPens == 0)
            )) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для первой, второй группы до пенсионного возроста',
                });
                return true;
            }
        }
        if (id == 478 || id == 480 || id == 482) {
            if (!(this.expertOpinion.disabilityGroupId == 1 ||
                this.expertOpinion.disabilityGroupId == 2 ||
                this.expertOpinion.disabilityGroupId == 3)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен для взрослых',
                });
                return true;
            }
            if (this.isSelectedItem(id == 478 ? 0 : 478)
                || this.isSelectedItem(id == 480 ? 0 : 480)
                || this.isSelectedItem(id == 482 ? 0 : 482)
            ) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }
        if (id == 479 || id == 481 || id == 483) {
            if (!(this.expertOpinion.disabilityGroupId == 1 ||
                this.expertOpinion.disabilityGroupId == 2 ||
                this.expertOpinion.disabilityGroupId == 3)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
            if (this.isSelectedItem(id == 479 ? 0 : 479)
                || this.isSelectedItem(id == 481 ? 0 : 481)
                || this.isSelectedItem(id == 483 ? 0 : 483)
            ) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }
        if (id == 484 || id == 486 || id == 488) {
            if (!(this.expertOpinion.disabilityGroupId == 4 ||
                this.expertOpinion.disabilityGroupId == 6 ||
                this.expertOpinion.disabilityGroupId == 7 ||
                this.expertOpinion.disabilityGroupId == 8 ||
                this.expertOpinion.disabilityGroupId == 9)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен только для детей',
                });
                return true;
            }
            if (this.isSelectedItem(id == 484 ? 0 : 484)
                || this.isSelectedItem(id == 486 ? 0 : 486)
                || this.isSelectedItem(id == 488 ? 0 : 488)
            ) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        if (id == 485 || id == 487 || id == 489) {
            if (!(this.expertOpinion.disabilityGroupId == 4 ||
                this.expertOpinion.disabilityGroupId == 6 ||
                this.expertOpinion.disabilityGroupId == 7 ||
                this.expertOpinion.disabilityGroupId == 8 ||
                this.expertOpinion.disabilityGroupId == 9)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи предназначен только для детей',
                });
                return true;
            }
            if (this.isSelectedItem(id == 485 ? 0 : 485)
                || this.isSelectedItem(id == 487 ? 0 : 487)
                || this.isSelectedItem(id == 489 ? 0 : 489)
            ) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        let iprArr = [5, 6, 8, 9, 11, 12, 13];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr = [495, 496, 497, 498, 499, 500, 501];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }
        iprArr = [16, 17, 19, 20, 22, 23, 588];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr = [502, 503, 504, 505, 506, 507, 589];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr = [313, 314, 315, 316, 317, 318, 319, 320, 492, 513, 327, 328, 329, 514, 515];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr = [31, 33, 10599, 10600];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr = [35, 39, 10603, 10601];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr = [36, 40, 10602, 10604];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr = [10605, 10606];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr = [58, 63, 591, 592, 593, 594, 595];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr = [228, 229, 230];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr = [278, 279, 280, 281, 282, 283, 284];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr = [266, 267, 268, 269, 270, 271, 274];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        let iprArr1 = [249, 250, 491];
        let iprArr2 = [249, 250, 491, 551, 552, 554, 555];
        if (iprArr1.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr2, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr1 = [257, 260, 263, 264];
        iprArr2 = [257, 260, 263, 264, 551, 552, 554, 555]
        if (iprArr1.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr2, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr1 = [551, 552, 554, 555];
        iprArr2 = [249, 250, 491, 257, 260, 263, 264, 551, 552, 554, 555]
        if (iprArr1.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr2, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr = [31, 33];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr = [35, 36, 471];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr = [43, 46, 473];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        iprArr = [463, 493, 603];
        if (iprArr.findIndex(item => item === id) > -1) {
            if (this.isInlistOrSelctedIdArr(iprArr, id)) {
                this.messageService.add({
                    severity: 'error',
                    summary: this.translationService.instant('COMMON.ERROR'),
                    detail: 'Данный вид помощи уже выбран',
                });
                return true;
            }
        }

        return false;
    }

    private filterTree(nodes: TreeNode[], q: string): TreeNode[] {
        if (!q) return nodes;
        const match = (n: TreeNode) => (n.label ?? '').toLowerCase().includes(q);

        const walk = (arr: TreeNode[]): TreeNode[] =>
            arr.map(n => {
                const kids = n.children ? walk(n.children) : [];
                return (match(n) || kids.length) ? {...n, children: kids} : null as any;
            }).filter(Boolean);

        return walk(nodes);
    }
}
