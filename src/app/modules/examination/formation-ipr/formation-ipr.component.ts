import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ChooseHelpComponent} from "./choose-help/choose-help.component";
import {DictionaryService} from "../../../core/service/dictionary.service";
import {DHelp} from "../../../dto/dictionary/DHelp";
import {TranslateService} from "@ngx-translate/core";
import {IprDataList} from "../../../core/model/iprDataList";
import {CamundaService} from "../../../core/service/camunda.service";
import {DictionaryValue} from "../../../core/model/dictionary-value";
import {Expertopinion} from "../../../core/model/expertopinion";
import {IprDataMedProf} from "../../../core/model/iprDataMedProf";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-formation-ipr',
    templateUrl: './formation-ipr.component.html',
    styleUrl: './formation-ipr.component.css'
})
export class FormationIprComponent implements OnInit {
    @Input() patientId: number | null = null;
    @Input() expertOpinionId: number | null = null;
    @Output() prev = new EventEmitter<void>();
    @ViewChild(ChooseHelpComponent) chooseHelpComponent: ChooseHelpComponent;

    dHelp: DHelp[];
    dHelpProf: DictionaryValue[];
    dHelpMed: DictionaryValue[];
    expertOpinion: Expertopinion;
    lang: string;
    showModal = false;
    iprDataList: IprDataList;

    constructor(private dictionaryService: DictionaryService,
                private translateService: TranslateService,
                private camundaService: CamundaService,
                private messageService: MessageService,
                private translationService: TranslateService) {
    }

    ngOnInit() {
        console.log('expertOpinionId' + this.expertOpinionId);
        this.lang = this.translateService.currentLang || 'kk';
        this.dictionaryService.loadDHelp('d-help').subscribe(res => {
            this.dHelp = res;
        });
        if (this.expertOpinionId) {
            this.camundaService.getExpertOpinionById(this.expertOpinionId).subscribe({
                next: p => {
                    this.expertOpinion = p;
                },
                error: err => {
                    console.error(err);
                }
            });
            this.camundaService.getIprDataListByExpertOpinionId(this.expertOpinionId).subscribe(data => {
                this.iprDataList = data;
                this.getProfIprDictionary();
                this.getMedIprDictionary();
            });
        }
    };

    trackByProf = (_: number, it: IprDataMedProf) => it.helpId?.id ?? it.id ?? _;

    trackById = (_: number, s: IprDataMedProf) => s.id;

    getProfIprDictionary() {
        this.dictionaryService.load(47, 'd_help_prof').subscribe(res => {
            this.dHelpProf = res;
            if (this.iprDataList.profIpr) {
                console.log(this.iprDataList.profIpr);
                this.iprDataList.profIpr.forEach(item => {
                    item.checked = true;
                    item.showBlock = true;
                });
            }
            this.dHelpProf.forEach((item: any) => {
                if (!this.iprDataList.profIpr
                    || this.iprDataList.profIpr.findIndex(ipr => ipr.helpId.id === item.id) === -1) {
                    this.iprDataList.profIpr.push({
                        checked: false,
                        helpId: item,
                        id: null,
                        iprDate: null,
                        deadlineDate: null,
                        recommended: null
                    });
                }
            });
        });
    }

    getMedIprDictionary() {
        this.dictionaryService.load(134, 'd_help_med').subscribe(res => {
            this.dHelpMed = res;
            if (this.iprDataList.medIpr) {
                console.log(this.iprDataList.medIpr);
                this.iprDataList.medIpr.forEach(item => {
                    item.checked = true;
                });
            }
            this.dHelpMed.forEach((item: any) => {
                if (!this.iprDataList.medIpr
                    || this.iprDataList.medIpr.findIndex(ipr => ipr.helpId.id === item.id) === -1) {
                    this.iprDataList.medIpr.push({
                        checked: false,
                        helpId: item,
                        id: null,
                        iprDate: null,
                        deadlineDate: null,
                        recommended: null
                    });
                }
            });
        });
    }

    onChangeCheckboxProf(item) {
        if (item.checked) {
            item.showBlock = true;
        } else {
            //to-do
        }
        let d = this.expertOpinion.disabEstForPeriodTo;
        console.log(this.expertOpinion.disabEstForPeriodTo)
        if (d != null) {
            d = d.split('.')[2] + '-' + d.split('.')[1] + '-' + d.split('.')[0];
        }

        if (item.checked) {
            item.typeId = 1;
            item.expertOpinionId = this.expertOpinion.id;
        } else {
            item.typeId = null;
            item.expertOpinionId = null;
        }
    }

    onChangeCheckboxMed(item) {
        if (item.checked) {
            item.typeId = 2;
            item.expertOpinionId = this.expertOpinion.id;
        } else {
            item.typeId = null;
            item.expertOpinionId = null;
        }
    }

    open() {
        this.showModal = true;
    }

    onConfirm(selectedIds: DHelp[]) {
        console.log('Выбрано:', selectedIds);
        if (!this.iprDataList.socialIpr) {
            this.iprDataList.socialIpr = [];
        }
        selectedIds.forEach((item: any) => {
            this.iprDataList.socialIpr.push({
                expertOpinionId: this.expertOpinion.id,
                helpId: item
            });
        })
        this.showModal = false;
    }

    onPrev() {
        this.prev.emit();
    }

    onSave() {
        const param = Object.assign({}, this.iprDataList);
        param.profIpr = this.iprDataList.profIpr.filter(item => item.checked);
        param.medIpr = this.iprDataList.medIpr.filter(item => item.checked);
        this.camundaService.saveIprDataList(param).subscribe({
            next: response => {
                this.messageService.add({
                    severity: 'success',
                    summary: this.translationService.instant('COMMON.SUCCESSFULLY_SAVED'),
                    detail: 'Успешно сохранено!',
                });
            }
        });
    }
}
