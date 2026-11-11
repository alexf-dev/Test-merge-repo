import {Component, Input, OnInit} from '@angular/core';
import {DictionaryService} from '../../../core/service/dictionary.service';
import {DictionaryValue} from '../../../core/model/dictionary-value';
import {ReexaminationAppealDto} from '../../../dto/omk/reexamination-appeal-dto';
import {MessageService} from "primeng/api";
import {ApiService} from "../../../core/api.service";
import {TranslationService} from "../../../core/service/translation.service";
import {CamundaService} from "../../../core/service/camunda.service";
import {AuthService} from "../../../core/service/auth.service";
import {ResolutionApprovedResponse} from "../../../dto/resolutionApproved/resolution-approved-response";

@Component({
  selector: 'app-omk-request-form',
  templateUrl: './omk-request-form.component.html',
  styleUrls: ['./omk-request-form.component.css']
})
export class OmkRequestFormComponent implements OnInit {
  @Input() patient: any;

  @Input() resolution: ResolutionApprovedResponse;

  reExaminationAppealDto: ReexaminationAppealDto = new ReexaminationAppealDto();
  appealStatuses: DictionaryValue[] = [];

  constructor(private dictionaryService: DictionaryService, private messageService: MessageService,
              private camundaService: CamundaService, private translationService: TranslationService,
              public authService: AuthService) {
  }

  private readonly MAX_FILE_SIZE_MB = 1;

  selectedComplaintIds: number[] = [];
  patientId: number;
  selectedFileName = null;


  isViewMode = false;
  isLoading = false;
  maxSelectableDate: Date = new Date();


  ngOnInit(): void {

    this.patientId = this.patient?.history?.id ?? this.resolution?.patientId;

    this.loadOmkData(this.patientId);

    this.dictionaryService.load(131, 'Z_D_APPEAL_STATUSES').subscribe(res => {
      this.appealStatuses = res;
    });

  }

  onComplaintChange(ids: number[]): void {
    this.selectedComplaintIds = ids || [];
    console.log('aaa: ', ids);
    this.reExaminationAppealDto.reExaminationAppealTypes =
      this.selectedComplaintIds.map(id => ({
        appealType: id
      }));
  }

  get selectedComplaintItems(): DictionaryValue[] {
    return this.appealStatuses.filter(x =>
      this.selectedComplaintIds.includes(x.id)
    );
  }

  removeComplaint(id: number): void {
    const updated = this.selectedComplaintIds.filter(x => x !== id);
    this.onComplaintChange(updated);
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (!file) {
      this.selectedFileName = null;
      this.reExaminationAppealDto.file = null;
      return;
    }

    const isPdf =
      file.type === 'application/pdf' ||
      file.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      this.selectedFileName = null;
      this.reExaminationAppealDto.file = null;
      input.value = '';

      this.messageService.add({
        severity: 'error',
        summary: this.translationService.instant('COMMON.ERROR'),
        detail: this.translationService.instant('OMK.REEXAMINATION.PDF')
      });
      return;
    }

    const sizeMb = file.size / 1024 / 1024;
    if (sizeMb > this.MAX_FILE_SIZE_MB) {
      this.messageService.add({
        severity: 'error',
        summary: this.translationService.instant('COMMON.ERROR'),
        detail: this.translationService.instant('OMK.REEXAMINATION.MAX_SIZE_PDF')
      });
      return;
    }

    this.selectedFileName = file.name;
    this.reExaminationAppealDto.file = file;
  }


  removeFile(input: HTMLInputElement): void {
    this.selectedFileName = null;
    this.reExaminationAppealDto.file = null;

    input.value = '';
  }

  openFileDialog(event: MouseEvent, input: HTMLInputElement): void {
    event.preventDefault();
    event.stopPropagation();
    input.click();
  }

  submitMock(): void {
    this.reExaminationAppealDto.patientId = this.patientId;
    console.log('OMK form mock:', this.reExaminationAppealDto);

    if (!this.authService.hasAnyAction('OMK_EDIT', 'OMK_2_EDIT') && this.patient != null) {
      this.messageService.add({
        severity: 'error',
        summary: this.translationService.instant('COMMON.ERROR'),
        detail: this.translationService.instant('OMK.ERROR_OMK'),
      })
      return;
    }

    if (this.patient?.expertopinion.poorlyFilled != null && !this.patient?.expertopinion.poorlyFilled) {
      this.messageService.add({
        severity: 'error',
        summary: this.translationService.instant('COMMON.ERROR'),
        detail: this.translationService.instant('OMK.REEXAMINATION.IS_POORLY_FILLED'),
      })
      return;
    }

    if (this.isPeriodExpired(this.patient?.expertopinion.finishExaminationDate) && this.reExaminationAppealDto.isAppeal === 1) {
      this.messageService.add({
        severity: 'error',
        summary: this.translationService.instant('COMMON.ERROR'),
        detail: this.translationService.instant('OMK.REEXAMINATION.APPEAL_PERIOD_EXPIRED'),
      })
      return;
    }

    this.saveAppeal(this.reExaminationAppealDto).subscribe({
      next: response => {
        this.isLoading = true
        this.messageService.add({
          severity: 'success',
          summary: this.translationService.instant('COMMON.SUCCESSFULLY_SAVED'),
          detail: null,
        });

        this.loadOmkData(this.patientId);
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

  saveAppeal(dto: ReexaminationAppealDto) {
    const formData = new FormData();

    if (dto.patientId != null) {
      formData.append('patientId', String(dto.patientId));
    }

    if (dto.reExaminationAppealTypes != null) {
      dto.reExaminationAppealTypes?.forEach((item, index) => {
        formData.append(
          `reExaminationAppealTypes[${index}].appealType`, String(item.appealType)
        );
      });
    }

    if (dto.isAppeal != null) {
      formData.append('isAppeal', String(dto.isAppeal));
    }

    if (dto.notes) {
      formData.append('notes', dto.notes);
    }

    if (dto.objectiveExamination) {
      formData.append('objectiveExamination', dto.objectiveExamination);
    }

    if (dto.conclusionRecommendations) {
      formData.append('conclusionRecommendations', dto.conclusionRecommendations);
    }

    if (dto.additionalLabData) {
      formData.append('additionalLabData', dto.additionalLabData);
    }

    if (dto.incomingLetterNo) {
      formData.append('incomingLetterNo', dto.incomingLetterNo);
    }

    if (dto.dateReceipt) {
      formData.append('dateReceipt', this.toDateOnly(dto.dateReceipt));
    }

    if (dto.file) {
      formData.append('file', dto.file, dto.file.name);
    }

    return this.camundaService.saveOmk(formData);
  }

  private toDateOnly(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private loadOmkData(id: number): void {
    this.camundaService.getOmkByPatientId(id).subscribe({
      next: p => {
        if (!p) {
          this.reExaminationAppealDto = new ReexaminationAppealDto();
          this.selectedFileName = null;
          this.selectedComplaintIds = [];
          this.isViewMode = false;
          return;
        }

        this.reExaminationAppealDto = p;
        this.selectedFileName = p.selectedFileName ?? null;

        this.reExaminationAppealDto.dateReceipt = p.dateReceipt
          ? new Date(p.dateReceipt)
          : null;


        this.selectedComplaintIds = (
          this.reExaminationAppealDto.reExaminationAppealTypes || []
        )
          .map(x => x.appealType)
          .filter((x): x is number => x != null);

        this.isViewMode = true;
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


  isPeriodExpired(date: string | Date): boolean {
    if (!date) {
      return false;
    }

    let deadline: Date;

    if (typeof date === 'string') {
      const [day, month, year] = date.split('.').map(Number);
      deadline = new Date(year, month - 1, day);
    } else {
      deadline = new Date(date);
    }
    if (isNaN(deadline.getTime())) {
      return false;
    }

    deadline.setMonth(deadline.getMonth() + 3);

    return Date.now() > deadline.getTime();
  }

}
