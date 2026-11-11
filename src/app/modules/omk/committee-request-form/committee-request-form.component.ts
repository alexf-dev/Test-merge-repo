import {Component, Input, OnInit} from '@angular/core';
import {ReexaminationAppealDto} from "../../../dto/omk/reexamination-appeal-dto";
import {CamundaService} from "../../../core/service/camunda.service";
import {TranslationService} from "../../../core/service/translation.service";
import {MessageService} from "primeng/api";
import {DictionaryValue} from "../../../core/model/dictionary-value";
import {DictionaryService} from "../../../core/service/dictionary.service";
import {ImageContentService} from "../../../core/service/image-content.service";
import {ExpertOpinionOmk} from "../../../dto/omk/expert-opinion-omk";
import {ReexaminationAppealUpdate} from "../../../dto/omk/reexamination-appeal-update";
import {AuthService} from "../../../core/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-committee-request-form',
  templateUrl: './committee-request-form.component.html',
  styleUrl: './committee-request-form.component.css'
})
export class CommitteeRequestFormComponent implements OnInit {

  @Input() appeal: any;
  @Input() reExaminationAppealDto!: ReexaminationAppealDto;
  @Input() expertOpinion: ExpertOpinionOmk | null = null;

  selectedComplaintIds: number[] = [];
  loadingPdf = false;

  appealStatuses: DictionaryValue[] = [];
  isUpdated = false;

  newExpertOpinionId: number;

  reexaminationAppealUpdate: ReexaminationAppealUpdate = new ReexaminationAppealUpdate();

  constructor(
    private camundaService: CamundaService,
    private translationService: TranslationService,
    private messageService: MessageService,
    private dictionaryService: DictionaryService,
    private imageContentService: ImageContentService,
    protected authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.dictionaryService.load(131, 'Z_D_APPEAL_STATUSES').subscribe(res => {
      this.appealStatuses = res;
    });

    this.prepareData();
  }

  private prepareData(): void {
    if (!this.reExaminationAppealDto) {
      this.reExaminationAppealDto = new ReexaminationAppealDto();
      return;
    }

    this.reExaminationAppealDto.dateReceipt = this.reExaminationAppealDto.dateReceipt
      ? new Date(this.reExaminationAppealDto.dateReceipt)
      : null;

    this.reexaminationAppealUpdate.statusId =
      this.reExaminationAppealDto.status?.id ?? null;

    this.reexaminationAppealUpdate.committeeComment =
      this.reExaminationAppealDto.committeeComment ?? null;

    this.selectedComplaintIds = (
      this.reExaminationAppealDto.reExaminationAppealTypes || []
    )
      .map(x => x.appealType)
      .filter((x): x is number => x != null);
  }

  get selectedComplaintItems(): DictionaryValue[] {
    return this.appealStatuses.filter(x =>
      this.selectedComplaintIds.includes(x.id)
    );
  }

  get isReadonly(): boolean {
    return this.reExaminationAppealDto.status?.id === 15137;
  }

  loadCurrentPdf(fileId: number): void {
    if (!fileId) {
      return;
    }

    this.loadingPdf = true;

    this.imageContentService.getPdf(fileId).subscribe({
      next: (blob: Blob) => {
        const pdfBlob = new Blob([blob], {type: 'application/pdf'});
        const pdfUrl = URL.createObjectURL(pdfBlob);

        window.open(pdfUrl, '_blank');

        this.loadingPdf = false;

        setTimeout(() => {
          URL.revokeObjectURL(pdfUrl);
        }, 10000);
      },
      error: () => {
        this.loadingPdf = false;

        this.messageService.add({
          severity: 'error',
          summary: this.translationService.instant('COMMON.ERROR'),
          detail: 'Не удалось загрузить PDF'
        });
      }
    });
  }

  updateAppealStatus(): void {
    if (this.isReadonly || this.isUpdated || !this.reexaminationAppealUpdate.statusId) {
      return;
    }

    this.reexaminationAppealUpdate.id = this.appeal.id;

    this.camundaService.updateAppealStatusOmk(this.reexaminationAppealUpdate).subscribe({
      next: () => {
        this.isUpdated = true;

        this.messageService.add({
          severity: 'success',
          summary: this.translationService.instant('COMMON.SUCCESSFULLY_SAVED'),
          detail: 'Сохранено',
        });
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

  considerOmk(): void {

    // this.router.navigate(['/main/examination', 9195317, 17417946]);

    this.camundaService.considerOmk(this.expertOpinion.id, this.appeal.id).subscribe({
      next: res => {
        this.newExpertOpinionId = res;

        this.router.navigate(['/main/examination', this.appeal.patientId, this.newExpertOpinionId]);
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
