import {Component, OnInit} from '@angular/core';
import {DictionaryValue} from "../../core/model/dictionary-value";
import {DictionaryService} from "../../core/service/dictionary.service";
import {CamundaService} from "../../core/service/camunda.service";
import {AppealJournalResponse} from "../../dto/omk/appeal-journal-response";
import {PageResponse} from "../../dto/page-response";
import {ReestrExpertsResponse} from "../../dto/reestrExperts/reestr-experts-response";
import {MkbsVacationsResponseDto} from "../../dto/reestrExperts/mkbs-vacations-response-dto";
import {Router} from "@angular/router";
import {AuthService} from "../../core/service/auth.service";
import {UpdateStatusExpertDto} from "../../dto/reestrExperts/update-status-expert-dto";
import {TranslationService} from "../../core/service/translation.service";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-reestr-experts',
  templateUrl: './reestr-experts.component.html',
  styleUrl: './reestr-experts.component.css'
})
export class ReestrExpertsComponent implements OnInit {

  excludingDialogVisible = false;


  dicStatus: DictionaryValue[] = [];

  selectedRow: any = null;

  reestrExpertsResponse: ReestrExpertsResponse[] = [];
  pageResponse!: PageResponse<ReestrExpertsResponse>;

  expandedExpertId: number | null = null;
  mkbsVacationsMap: Record<number, MkbsVacationsResponseDto> = {};

  isUpdated = false;
  updateStatusExpert: UpdateStatusExpertDto = new UpdateStatusExpertDto();

  reestrExpertsFilter: any = {
    iin: '',
    status: null,
    type: '',
    pageNum: 1,
    pageSize: 10,
  };

  constructor(
    private dictionaryService: DictionaryService,
    private camundaService: CamundaService,
    private router: Router,
    private translationService: TranslationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.dictionaryService.load(127, 'Z_D_INDEPEXP_STATUS').subscribe(res => {
      this.dicStatus = res;
    });

    this.search();
  }

  search(): void {
    this.camundaService.getReestrExperts(this.reestrExpertsFilter).subscribe(res => {
      this.pageResponse = res;
      this.reestrExpertsResponse = this.pageResponse.list;
    });
  }

  clear(): void {
    this.reestrExpertsFilter = {
      iin: '',
      status: null,
      type: '',
      pageNum: 1,
      pageSize: 10,
    };


    this.search();
  }

  openPageNewExpert(): void {
    this.router.navigate(['/main/reestr-experts/registering']);
  }


  openPageExcludeExpert(expert: any): void {
    this.selectedRow = expert;
    this.excludingDialogVisible = true;
  }

  onPageChange(event: any): void {
    this.reestrExpertsFilter.pageNum = event.first / event.rows + 1;
    this.reestrExpertsFilter.pageSize = event.rows;

    this.search();
  }

  toggleExpert(expert: any): void {

    if (this.expandedExpertId === expert.id) {
      this.expandedExpertId = null;
      return;

    }

    this.expandedExpertId = expert.id;

    if (!this.mkbsVacationsMap[expert.id]) {
      this.getMkbsVacations(expert.id);
    }

  }


  getMkbsVacations(expertId: number): void {
    this.camundaService.getMkbsVacations(expertId).subscribe(res => {
      this.mkbsVacationsMap[expertId] = res;
    });
  }

  confirmUpdateStatus(
    expert: any,
    statusId: number,
    action: 'include' | 'declineInclude' | 'exclude' | 'declineExclude'
  ): void {
    const messages = {
      include: this.translationService.instant('REESTR_EXPERTS.CONFIRM_INCLUDE_EXPERT'),
      declineInclude: this.translationService.instant('REESTR_EXPERTS.CONFIRM_DECLINE_INCLUDE_EXPERT'),
      exclude: this.translationService.instant('REESTR_EXPERTS.CONFIRM_EXCLUDE_EXPERT'),
      declineExclude: this.translationService.instant('REESTR_EXPERTS.CONFIRM_DECLINE_EXCLUDE_EXPERT')
    };

    this.confirmationService.confirm({
      message: messages[action],
      header: this.translationService.instant('REESTR_EXPERTS.CONFIRMATION'),
      icon: 'pi pi-question-circle',

      acceptLabel: this.translationService.instant('REESTR_EXPERTS.YES'),
      rejectLabel: this.translationService.instant('REESTR_EXPERTS.NO'),

      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.selectedRow = expert;
        this.updateStatus(statusId);
      }
    });
  }

  updateStatus(statusId: number): void {
    this.updateStatusExpert.id = this.selectedRow.id;
    this.updateStatusExpert.statusId = statusId;

    this.camundaService.updateStatusReestrExpert(this.updateStatusExpert).subscribe({
      next: () => {
        this.isUpdated = true;
        this.messageService.add({
          severity: 'success',
          summary: this.translationService.instant('COMMON.SUCCESSFULLY_SAVED'),
          detail: 'Сохранено',
        });
        this.search();
        this.excludingDialogVisible = false;
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: this.translationService.instant('COMMON.ERROR'),
          detail: err.message || err,
        });

      }
    });
  }

}
