import {Component, NgZone, OnInit} from '@angular/core';
import {DictionaryValue} from "../../core/model/dictionary-value";
import {DictionaryService} from "../../core/service/dictionary.service";
import {PageResponse} from "../../dto/page-response";
import {IndepExpertActsDto} from "../../dto/completed-work-act/indep-expert-acts-dto";
import {CompletedWorkActsService} from "../../core/service/completed-work-acts.service";
import {AuthService} from "../../core/service/auth.service";
import {IndepExpertActsFilter} from "../../dto/completed-work-act/indep-expert-acts-filter";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {finalize} from "rxjs";
import {MessageService} from "primeng/api";


@Component({
    selector: 'app-completed-work-acts',
    templateUrl: './completed-work-acts.component.html',
    styleUrl: './completed-work-acts.component.css'
})
export class CompletedWorkActsComponent implements OnInit {
    dicRegion: DictionaryValue[] = [];
    dicStatus: DictionaryValue[] = [];
    dicYear: DictionaryValue[] = [];
    dicMonth: DictionaryValue[] = [];

    indepExpertActsFilter: IndepExpertActsFilter = {
        region: null,
        status: null,
        year: null,
        month: null,
        pageNum: 1,
        pageSize: 10
    }

    journalCompletedWorkActsResponse: IndepExpertActsDto[] = [];
    pageResponse?: PageResponse<IndepExpertActsDto>;

    currentExpertId: number = null;
    profile$: any = null;
    isIEExpert: boolean = false;

    actDialogVisible = false;
    documentLoading = false;
    pdfUrl: SafeResourceUrl | null = null;
    selectedAct: IndepExpertActsDto | null = null;
    edsLoading = false;
    revisionDialogVisible = false;
    exportVisible = false;
    statusNames: Record<number, string> = {
        1: 'Проект',
        2: 'Согласован экспертом',
        3: 'Утвержден',
        4: 'На доработке'
    };
    private pdfObjectUrl: string | null = null;

    constructor(private messageService: MessageService,
                private dictionaryService: DictionaryService,
                private completedWorkActsService: CompletedWorkActsService,
                public authService: AuthService,
                private sanitizer: DomSanitizer,
                private ngZone: NgZone) {
    }

    ngOnInit(): void {

        this.loadProfile();
        this.loadDictionaries();
        window['angularComponentReference'] = {
            component: this,
            zone: this.ngZone,
            loadAngularFunction: () => {
                this.signXml(window.getResXML());
            }
        };
    }

    search(): void {
        this.indepExpertActsFilter.pageNum = 1;
        this.loadPage();
    }

    clear(): void {
        this.indepExpertActsFilter = {
            region: null,
            status: null,
            year: null,
            month: null,
            pageNum: 1,
            pageSize: 10
        };

        this.loadPage();
    }

    onPageChange(event: any): void {
        this.indepExpertActsFilter.pageNum = event.first / event.rows + 1;
        this.indepExpertActsFilter.pageSize = event.rows;

        this.loadPage();
    }

    yearChange() {
        this.indepExpertActsFilter.month = null;
        if (this.isIEExpert) {
            this.loadMonthDic(this.indepExpertActsFilter.year, this.currentExpertId);
        } else {
            this.loadMonthDic(this.indepExpertActsFilter.year, 0);
        }
    }

    loadMonthDic(selectedYear: any, expertId: number) {
        this.completedWorkActsService.getDicMonths(selectedYear, this.currentExpertId).subscribe(res => {
            this.dicMonth = res;
            console.log(this.dicMonth)
        });
    }

    openAct(row: IndepExpertActsDto): void {
        this.releasePdf();

        this.selectedAct = row;
        this.actDialogVisible = true;
        this.documentLoading = true;

        this.completedWorkActsService.generateDocument(row.id).subscribe({
            next: response => {
                if (!this.actDialogVisible || this.selectedAct !== row) {
                    return;
                }

                try {
                    if (!response.content) {
                        throw new Error('Содержимое PDF отсутствует');
                    }

                    const binary = atob(response.content);
                    const bytes = new Uint8Array(binary.length);

                    for (let i = 0; i < binary.length; i++) {
                        bytes[i] = binary.charCodeAt(i);
                    }

                    const blob = new Blob([bytes], {
                        type: 'application/pdf'
                    });

                    this.pdfObjectUrl = URL.createObjectURL(blob);
                    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                        this.pdfObjectUrl
                    );
                } catch (error) {
                    console.error('Не удалось открыть PDF', error);
                } finally {
                    this.documentLoading = false;
                }
            },
            error: error => {
                if (this.selectedAct !== row) {
                    return;
                }

                this.documentLoading = false;
                console.error('Ошибка формирования документа', error);
            }
        });
    }

    showExportComponent(row: IndepExpertActsDto): void {
        this.selectedAct = row;
        this.exportVisible = true;
    }

    onActDialogHide(): void {
        this.actDialogVisible = false;
        this.selectedAct = null;
        this.documentLoading = false;
        this.releasePdf();
    }

    signAct(): void {
        if (!this.selectedAct) {
            return;
        }
        window.callNCALayer('signArrXMLCall2');
    }

    signXml(resXml: string): void {

        if (!this.selectedAct) {
            return;
        }

        this.edsLoading = true;

        this.completedWorkActsService.saveSignedAct({
            id: this.selectedAct.id,
            status: this.selectedAct.status,
            expertSignedXml: resXml
        })
            .pipe(
                finalize(() => this.edsLoading = false)
            )
            .subscribe({
                next: result => {

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Успешно',
                        detail: 'Акт выполненых работ успешно подписан'
                    });

                    this.selectedAct = null;
                    this.actDialogVisible = false;
                    this.search();

                    return;
                },

                error: err => {
                    console.error(err);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Ошибка',
                        detail: 'Ошибка при подписании'
                    });
                }
            });
    }

    ngOnDestroy(): void {
        this.releasePdf();
    }

    sendForRevision(): void {
        if (!this.selectedAct) {
            return;
        }

        this.revisionDialogVisible = true;
    }

    onRevisionSaved(event: {
        actId: number;
        revisionReason: string;
    }): void {
        if (this.selectedAct?.id === event.actId) {
            this.selectedAct.status = 4;
            this.selectedAct.revisionReason = event.revisionReason;
            this.selectedAct.expertSignedXml = null;
        }

        this.actDialogVisible = false;

    }

    private loadProfile(): void {
        this.profile$ = this.authService.getProfile();

        if (!this.profile$) {
            return;
        }

        this.loadExpertId();
    }

    private loadExpertId(): void {
        this.completedWorkActsService
            .getExpertId()
            .subscribe(expertId => {
                this.currentExpertId = expertId;

                this.loadYearDic();
                this.loadPage();
            });
    }

    private loadYearDic(): void {
        if (!this.currentExpertId) {
            return;
        }

        this.completedWorkActsService
            .getDicYears(this.currentExpertId)
            .subscribe(res => {
                this.dicYear = res;
            });
    }

    private loadDictionaries(): void {
        this.dictionaryService
            .load(105, 'D_REGION')
            .subscribe(res => {
                this.dicRegion = res;
            });
        this.dictionaryService
            .load(152, 'D_COMPLETED_ACT_STATUS')
            .subscribe(res => {
                this.dicStatus = res;
            });
    }

    private loadPage(): void {
        this.completedWorkActsService
            .getCompletedWorkActs(this.indepExpertActsFilter)
            .subscribe(res => {
                this.pageResponse = res;
                this.journalCompletedWorkActsResponse = res.list ?? [];
            });
    }

    private releasePdf(): void {
        this.pdfUrl = null;

        if (this.pdfObjectUrl) {
            URL.revokeObjectURL(this.pdfObjectUrl);
            this.pdfObjectUrl = null;
        }
    }

}
