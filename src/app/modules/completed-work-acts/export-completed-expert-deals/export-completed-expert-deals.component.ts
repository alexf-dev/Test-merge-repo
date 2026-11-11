import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MessageService} from "primeng/api";
import {finalize} from "rxjs";
import {ExpertDealDto} from "../../../dto/completed-work-act/expert-deal-dto";
import * as XLSX from 'xlsx';
import {CompletedWorkActsService} from "../../../core/service/completed-work-acts.service";

@Component({
    selector: 'app-export-completed-expert-deals',
    templateUrl: './export-completed-expert-deals.component.html',
    styleUrl: './export-completed-expert-deals.component.css'
})
export class ExportCompletedExpertDealsComponent {

    @Input() visible = false;
    @Input() actId: number | null = null;
    @Input() period: string | null = null;
    @Input() fileName: string | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();

    loading = false;
    loaded = false;
    progress = 0;

    constructor(
        private messageService: MessageService,
        private completedWorkActsService: CompletedWorkActsService
    ) {
    }

    stopExport(): void {
        this.visible = false;
        this.loading = false;
        this.loaded = false;
        this.progress = 0;
        this.visibleChange.emit(false);
    }

    startExport(): void {
        if (this.actId == null) {
            this.messageService.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: 'Не указан ID акта'
            });
            return;
        }

        this.loading = true;
        this.loaded = false;
        this.changeProgress(10);

        this.completedWorkActsService
            .getExpertDealsList(this.actId)
            .pipe(
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe({
                next: (data: ExpertDealDto[]) => {
                    this.changeProgress(60);

                    if (!data || data.length === 0) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Ошибка',
                            detail: 'Нет данных для экспорта'
                        });
                        return;
                    }

                    const exportData = this.isAppealPeriod()
                        ? this.reFormDataAppeal(data)
                        : this.reFormData(data);

                    this.changeProgress(90);

                    this.exportToExcel(exportData);

                    this.changeProgress(100);
                    this.loaded = true;
                },
                error: error => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Ошибка',
                        detail: 'Ошибка при экспорте'
                    });
                }
            });
    }

    private isAppealPeriod(): boolean {
        return this.period?.substring(5, 7) === 'hy';
    }

    private changeProgress(percent: number): void {
        this.progress = percent;
    }

    private exportToExcel(data: Record<string, unknown>[]): void {
        if (!data || data.length === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: 'Нет данных для экспорта'
            });
            return;
        }

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

        this.autoSizeColumns(worksheet, data);

        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Реестр');

        const name = this.fileName?.trim() || 'Реестр рассмотренных актов';

        XLSX.writeFile(workbook, `${name}.xlsx`);
    }

    private autoSizeColumns(
        worksheet: XLSX.WorkSheet,
        data: Record<string, unknown>[]
    ): void {
        if (!data.length) {
            return;
        }

        const headers = Object.keys(data[0]);

        worksheet['!cols'] = headers.map(header => {
            const maxDataLength = data.reduce((max, row) => {
                const value = row[header];
                const length = value == null ? 0 : String(value).length;
                return Math.max(max, length);
            }, 0);

            return {
                wch: Math.min(
                    Math.max(header.length + 2, maxDataLength + 2, 12),
                    50
                )
            };
        });
    }

    private reFormData(data: ExpertDealDto[]): Record<string, unknown>[] {
        return data.map((item, index) => ({
            '№': index + 1,
            'ФИО эксперта': item.expertFullName,
            'Номер акта': item.numberOfForm031,
            'Дата вынесения решения': item.modifyDate,
            'Рассмотреть акт до': item.deadlineEndDate,
            'Дата вынесения сводного решения': item.combModifyDate,
            'Группа инвалидности (по решению эксперта)': item.disabilityGroupExp,
            'Группа инвалидности (сводное решение)': item.disabilityGroupRes,
            'Количество дел': item.dealCount,
            'Вовремя рассмотренное дело': item.isNotExpired,
            'Одинаковая группа со сводным решением': item.isSameGroup,
            'УОТ первичный по сводному решению': item.uotFirst,
            'УОТ первичный по решению эксперта': item.uotFirstExp,
            'УОТ повторный по сводному решению': item.uotRepeat,
            'УОТ повторный по решению эксперта': item.uotRepeatExp,
            'ИПР по сводному решению': item.ipr,
            'ИПР по решению эксперта': item.iprExp,
            'Процент': item.calcExp
        }));
    }

    private reFormDataAppeal(data: ExpertDealDto[]): Record<string, unknown>[] {
        return data.map((item, index) => ({
            '№': index + 1,
            'ФИО эксперта': item.expertFullName,
            'Номер акта': item.numberOfForm031,
            'Дата вынесения решения': item.modifyDate,
            'Дата вынесения сводного решения': item.combModifyDate,
            'Группа инвалидности (по решению эксперта)': item.disabilityGroupExp,
            'Группа инвалидности (сводное решение)': item.disabilityGroupRes,
            'Группа инвалидности (по результатам обжалования)': item.disabilityGroupApp,
            'Одинаковая группа с обжалованием': item.isSameGroup,
            'УОТ первичный по сводному решению': item.uotFirst,
            'УОТ первичный по решению эксперта': item.uotFirstExp,
            'УОТ первичный по результатам обжалования': item.uotFirstApp,
            'УОТ повторный по сводному решению': item.uotRepeat,
            'УОТ повторный по решению эксперта': item.uotRepeatExp,
            'УОТ повторный по результатам обжалования': item.uotRepeatApp,
            'ИПР по сводному решению': item.ipr,
            'ИПР по решению эксперта': item.iprExp,
            'ИПР по результатам обжалования': item.iprApp,
            'Процент': item.calcExp
        }));
    }

}
