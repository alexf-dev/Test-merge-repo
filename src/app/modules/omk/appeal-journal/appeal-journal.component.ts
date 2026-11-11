import {Component, OnInit} from '@angular/core';
import {DictionaryValue} from "../../../core/model/dictionary-value";
import {DictionaryService} from "../../../core/service/dictionary.service";
import {AppealJournalResponse} from "../../../dto/omk/appeal-journal-response";
import {CamundaService} from "../../../core/service/camunda.service";
import {PageResponse} from "../../../dto/page-response";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../../core/service/auth.service";
import {ReexaminationAppealDto} from "../../../dto/omk/reexamination-appeal-dto";
import {ExpertOpinionOmk} from "../../../dto/omk/expert-opinion-omk";
import {forkJoin} from "rxjs";
import {ExpertOpinionSmallDto} from "../../../dto/omk/expert-opinion-small-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appeal-journal',
  templateUrl: './appeal-journal.component.html',
  styleUrl: './appeal-journal.component.css'
})
export class AppealJournalComponent implements OnInit {

  committeeDialogVisible = false;
  loadingCommitteeModal = false;

  loadingAppealId: number | null = null;
  loadingPatientId: number | null = null;

  committeeEdit = false;

  selectedRow: any = null;
  selectedOmkData: ReexaminationAppealDto | null = null;
  selectedExpertOpinion: ExpertOpinionOmk | null = null;

  dicStatus: DictionaryValue[] = [];
  dicRegion: DictionaryValue[] = [];

  appealJournalResponse: AppealJournalResponse[] = [];
  pageResponse!: PageResponse<AppealJournalResponse>;

  appealJournalFilter: any = {
    actNumber: '',
    lastname: '',
    status: null,
    regionCode: '',
    pageNum: 1,
    pageSize: 10,
  };

  constructor(
    private dictionaryService: DictionaryService,
    private camundaService: CamundaService,
    private translate: TranslateService,
    public authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.authService.profile$.subscribe(profile => {
      this.committeeEdit = profile?.actions?.includes('COMMITTEE_EDIT') ?? false;
    })

    this.dictionaryService.load(123, 'Z_D_RE_EXAM_STATUSES').subscribe(res => {
      this.dicStatus = res;
    });

    this.dictionaryService.load(105, 'D_REGION').subscribe(res => {
      this.dicRegion = res;
    });




    this.search();
  }

  search(): void {
    this.camundaService.getAppealJournal(this.appealJournalFilter).subscribe(res => {
      this.pageResponse = res;
      this.appealJournalResponse = this.pageResponse.list;
    });
  }

  clear(): void {
    this.appealJournalFilter = {
      actNumber: '',
      lastname: '',
      status: null,
      regionCode: '',
      pageNum: 1,
      pageSize: 10,
    };

    this.search();
  }

  onPageChange(event: any): void {
    this.appealJournalFilter.pageNum = event.first / event.rows + 1;
    this.appealJournalFilter.pageSize = event.rows;
    this.search();
  }

  getStatusLabel(appeal: any): string {
    const currentLang = this.translate.currentLang || this.translate.defaultLang;

    if (currentLang === 'kk') {
      return appeal?.nameKz || appeal?.nameRu || '-';
    }

    return appeal?.nameRu || appeal?.nameKz || '-';
  }

  openCommitteeModal(row: any): void {
    this.loadingCommitteeModal = true;
    this.loadingAppealId = row.id;

    forkJoin({
      omkData: this.camundaService.getOmkByAppealId(row.id),
      expertOpinion: this.camundaService.getExpertOpinionByPatientId(row.patientId)
    }).subscribe({
      next: ({omkData, expertOpinion}) => {
        this.selectedRow = row;
        this.selectedOmkData = omkData ?? new ReexaminationAppealDto();
        this.selectedExpertOpinion = expertOpinion;

        this.committeeDialogVisible = true;
        this.loadingCommitteeModal = false;
        this.loadingAppealId = null;
      },
      error: () => {
        this.loadingCommitteeModal = false;
        this.loadingAppealId = null;
      }
    });
  }

  onCommitteeDialogHide(): void {
    this.selectedRow = null;
    this.selectedOmkData = null;
    this.selectedExpertOpinion = null;
    this.search();
  }


  openExpertOpinion(patientId: number): void {

    this.loadingPatientId = patientId


    this.camundaService.getExpertOpinionId(patientId).subscribe({
      next: res => {
        if (res?.id) {
          this.router.navigate(['/main/examination', patientId, res.id]);
        }
      },
      error: () => {
        this.loadingPatientId = null
      },
      complete: () => {
        this.loadingPatientId = null
      }
    });
  }

}
