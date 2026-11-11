import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TranslationService} from "../../../core/service/translation.service";
import {CamundaService} from "../../../core/service/camunda.service";
import {MessageService} from "primeng/api";
import {Patient} from "../../../core/model/patient";

export type TabMode = 'in_person' | 'in_absentia' | 'control_appeal' | 'view' | string;

export interface TabConfig {
    id: number;
    label: string;
}

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrl: './tabs.component.css'
})
export class TabsComponent {
    activeTab = 1;
    mode!: string;
    patientId: number | null = null;
    expertOpinionId: number | null = null;
    patient: Patient;
    mainId: number = null;

    activeTabs: TabConfig[] = [];
    private readonly ALL_TABS: Record<number, string> = {
        1: 'Регистрационные данные',
        2: 'Социальные данные',
        3: 'Освидетельствование',
        4: 'Законный представитель',
        5: 'Документы',
        6: 'Динамика обращения на МСЭ',
        7: 'Экспертное заключение',
        8: 'ИПР'
    };

    private readonly modeTabMapping: Record<string, number[]> = {
        'view': [1, 2, 3, 4, 5, 7],
        'in-person': [1, 2, 3, 4, 5, 7],
        'in-absentia': [5, 6, 7, 8],
        'control-appeal': [7, 8]
    };

    constructor(private route: ActivatedRoute,
                private translationService: TranslationService,
                private camundaService: CamundaService,
                private messageService: MessageService) {
    }

    ngOnInit() {
        const raw = this.route.snapshot.paramMap.get('patientId');
        const raw2 = this.route.snapshot.paramMap.get('expertOpinionId');
        this.mode = this.route.snapshot.paramMap.get('mode');
        this.patientId = raw !== null && !Number.isNaN(Number(raw)) ? Number(raw) : null;
        this.expertOpinionId = raw2 !== null && !Number.isNaN(Number(raw2)) ? Number(raw2) : null;
        console.log('patientId:' + this.patientId);
        console.log('expertOpinionId:' + this.expertOpinionId);
        if (this.patientId) {
            this.camundaService.getById(this.patientId).subscribe({
                next: p => {
                    this.patient = p;
                    this.mainId = this.patient.declarationId?.mainId;
                },
                error: err => {
                    this.messageService.add({
                        severity: 'error',
                        summary: this.translationService.instant('COMMON.ERROR'),
                        detail: 'Освидетельствование не найдено!',
                    });
                    console.error(err);
                }
            });
        }
        this.initTabs()
    }

    private initTabs(): void {
        const tabIds = this.modeTabMapping[this.mode] || [1, 2, 3, 4, 5, 6, 7];

        this.activeTabs = tabIds
            .filter(id => this.ALL_TABS[id])
            .map(id => ({
                id,
                label: this.ALL_TABS[id]
            }));

        if (this.activeTabs.length > 0) {
            this.activeTab = this.activeTabs[0].id;
        }
    }

    goNext(): void {
        const currentIndex = this.activeTabs.findIndex(tab => tab.id === this.activeTab);
        if (currentIndex !== -1 && currentIndex < this.activeTabs.length - 1) {
            this.activeTab = this.activeTabs[currentIndex + 1].id;
        }
    }

    goPrev() {
        const prev = this.activeTab - 1;
        if (prev >= 1) this.activeTab = prev;
    }
}
