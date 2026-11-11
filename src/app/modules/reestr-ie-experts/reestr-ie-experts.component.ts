import {Component, OnInit} from '@angular/core';
import {DictionaryValue} from "../../core/model/dictionary-value";
import {ReestrExpertsResponse} from "../../dto/reestrExperts/reestr-experts-response";
import {PageResponse} from "../../dto/page-response";
import {MkbsVacationsResponseDto} from "../../dto/reestrExperts/mkbs-vacations-response-dto";
import {UpdateStatusExpertDto} from "../../dto/reestrExperts/update-status-expert-dto";
import {DictionaryService} from "../../core/service/dictionary.service";
import {CamundaService} from "../../core/service/camunda.service";
import {Router} from "@angular/router";
import {TranslationService} from "../../core/service/translation.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../core/service/auth.service";
import {ReestrExpertIeExcludeDto} from "../../core/model/reestr-expert-ie-exclude-dto";

@Component({
  selector: 'app-reestr-ie-experts',
  templateUrl: './reestr-ie-experts.component.html',
  styleUrl: './reestr-ie-experts.component.css'
})
export class ReestrIeExpertsComponent implements OnInit {

  excludingDialogVisible = false;

  dicStatus: DictionaryValue[] = [];

  dicReason: DictionaryValue[] = [];


  selectedRow: any = null;

  isUpdated = false;
  excludingLoading = false;

  reestrExpertsResponse: ReestrExpertsResponse[] = [];
  pageResponse!: PageResponse<ReestrExpertsResponse>;

  reasonCode: string | null = null;

  expandedExpertId: number | null = null;
  mkbsVacationsMap: Record<number, MkbsVacationsResponseDto> = {};

  reestrExpertsFilter: any = {
    iin: '',
    status: null,
    type: '',
    pageNum: 1,
    pageSize: 10,
  };

  reestrExcludeIEExpert: ReestrExpertIeExcludeDto = {
    id: 0,
    reasonCode: ''
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

    // this.dicReason = [
    //   {
    //     id: 15120,
    //     parId: null,
    //     code: "004",
    //     nameRu: "Систематическое невыполнение установленного планового показателя (более 3 раз) по освидетельствованию, определенному договором, без права повторного включения в реестр",
    //     nameKz: "Қайта енгізу құқығынсыз шартта анықталған куәландыру бойынша бекітілген жоспарлы көрсеткішті жүйелі түрде (3 реттен астам) орындамау",
    //     customKz: null,
    //     customRu: null,
    //     customInt: null,
    //     customText: null,
    //     json: null,
    //     dictionaryId: null,
    //     oldId: null,
    //     ageNum: null
    //
    //   },
    //   {
    //     id: 15121,
    //     parId: null,
    //     code: "005",
    //     nameRu: "По результатам ежемесячной/ годовой оценки результатов работы независимых экспертов МСЭ",
    //     nameKz: "МәС тәуелсіз сарапшылары жұмыс нәтижелерін бағалаудың ай сайынғы/жылдық қорытындысы бойынша",
    //     customKz: null,
    //     customRu: null,
    //     customInt: null,
    //     customText: null,
    //     json: null,
    //     dictionaryId: null,
    //     oldId: null,
    //     ageNum: null
    //   }
    // ]

    this.dictionaryService.load(127, 'Z_D_INDEPEXP_STATUS').subscribe(res => {
      const allowedIds = [14970, 14972]
      this.dicStatus = res.filter(item =>
        allowedIds.includes(item.id));
    });

    this.dictionaryService.load(137, 'D_IE_EXCLUDE_REASON').subscribe(res => {
      const allowedIds = [15121, 15120]
      this.dicReason = res.filter(item =>
        allowedIds.includes(item.id))
    });

    this.search();
  }

  excludeExpert(): void {
    if (!this.selectedRow?.id || !this.reasonCode) {
      return;
    }

    this.excludingLoading = true;

    this.reestrExcludeIEExpert = {
      id: this.selectedRow.id,
      reasonCode: this.reasonCode
    };


    this.camundaService.excludeIEExpert(this.reestrExcludeIEExpert).subscribe({
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
        this.excludingLoading = false;
      }
    });
  }

  search(): void {
    this.camundaService.getReestrIEExperts(this.reestrExpertsFilter).subscribe(res => {
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


}
