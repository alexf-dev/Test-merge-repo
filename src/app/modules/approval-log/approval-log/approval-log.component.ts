import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MessageService} from "primeng/api";
import {FaceService} from "../../../core/service/face.service";
import {FaceDataResponseDto} from "../../../core/model/face-data-response";
import {CamundaService} from "../../../core/service/camunda.service";
import {finalize} from "rxjs";
import {PageResponse} from "../../../dto/page-response";
import {JournalApprovalResponseDto} from "../../../dto/journaApproval/journal-approval-response-dto";
import {AuthService} from "../../../core/service/auth.service";
import {NcaLayerService} from "../../../core/service/nca-layer-service";

interface SignRow {
  patient: string;
  birthDate: Date;
  purpose?: string;
  expertiseStart: Date;
  managerDecision?: string;
  createdAt: Date;
  employee: string;
  status: string;
  iin?: string;
}

@Component({
  selector: 'app-approval-log',
  templateUrl: './approval-log.component.html',
  styleUrl: './approval-log.component.css'
})
export class ApprovalLogComponent implements OnInit {
  items: SignRow[] = [];

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  cameraVisible = false;
  selectedRow: JournalApprovalResponseDto | null = null;
  stream?: MediaStream;
  photoDataUrl: string | null = null; // data:image/jpeg;base64,...
  loading = false;
  faceDataResponse: FaceDataResponseDto;
  edsLoading = false;

  journalApprovalResponse: JournalApprovalResponseDto[] = [];
  pageResponse!: PageResponse<JournalApprovalResponseDto>;


  statusOptions = [
    {nameKk: 'Орындалған', nameRu: "Отработаны", id: 1},
    {nameKk: 'Орындалмаған', nameRu: "Не отработаны", id: 2}
  ];

  approvalLogFilter: any = {
    iin: '',
    status: null,
    dateFrom: null,
    dateTo: null,
    pageNum: 1,
    pageSize: 10,
  };


  constructor(private messageService: MessageService,
              private camundaService: CamundaService,
              private translationService: TranslateService,
              private faceService: FaceService,
              private ngZone: NgZone,
              protected authService: AuthService,
              private nca: NcaLayerService) {
  }

  ngOnInit(): void {

  }

  search(): void {
    this.camundaService.getJournalApproval(this.approvalLogFilter).subscribe(res => {
      this.pageResponse = res;
      this.journalApprovalResponse = this.pageResponse.list;
    });
  }

  clear(): void {
    this.approvalLogFilter = {
      iin: '',
      status: null,
      dateFrom: null,
      dateTo: null,
      pageNum: 1,
      pageSize: 10,
    };

    this.search();

  }

  getCondition(conditionKk: string, conditionRu: string): string {
    if (this.translationService.currentLang === 'kk') {
      return conditionKk;
    } else {
      return conditionRu;
    }
  }

  onPageChange(event: any): void {
    this.approvalLogFilter.pageNum = event.first / event.rows + 1;
    this.approvalLogFilter.pageSize = event.rows;

    this.search();
  }


  async selectSignType(row: JournalApprovalResponseDto): Promise<void> {
    this.selectedRow = row;

    this.camundaService.getSignXmls(row.expertOpinionId).subscribe({
      next: async response => {
        const xmls = [
          response.signXml,
          response.notificationXml,
        ];
        try {
          const signedXmls =
            await this.nca.signXmlArrayKeepingPositions(xmls);
          this.saveAndUpdateStatus(signedXmls[0], signedXmls[1]);
        } catch (error) {
          console.error('Ошибка подписания:', error);
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }


  onCameraDialogShow() {
    this.startCamera();
  }

  onCameraDialogHide() {
    this.stopCamera();
    this.photoDataUrl = null;
    this.selectedRow = null;
  }

  async startCamera() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Ваш браузер не поддерживает камеру');
      }

      this.stream = await navigator.mediaDevices.getUserMedia({video: true});

      if (!this.video) {
        console.error('Video element is not available');
        return;
      }

      this.video.nativeElement.srcObject = this.stream;

    } catch (err: any) {
      console.error(err);
      this.handleCameraError(err);
    }
  }

  stopCamera() {
    this.stream?.getTracks().forEach(t => t.stop());
    this.stream = undefined;
  }

  private handleCameraError(err: any) {
    let detail = 'Не удалось получить доступ к камере';

    if (err.name === 'NotFoundError' || err.name === 'OverconstrainedError') {
      detail = 'Камера не найдена!';
    } else if (err.name === 'NotAllowedError') {
      detail = 'Доступ к камере запрещён пользователем';
    }

    this.messageService.add({
      severity: 'error',
      summary: this.translationService.instant('COMMON.ERROR'),
      detail,
    });
  }

  takePhoto() {
    if (!this.video || !this.canvas) return;

    const videoEl = this.video.nativeElement;
    const canvasEl = this.canvas.nativeElement;

    canvasEl.width = videoEl.videoWidth;
    canvasEl.height = videoEl.videoHeight;

    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoEl, 0, 0);

    this.photoDataUrl = canvasEl.toDataURL('image/jpeg', 0.9);
  }

  retakePhoto() {
    this.photoDataUrl = null;
  }

  openPhotoVerification(row: JournalApprovalResponseDto): void {
    this.selectedRow = row;
    this.photoDataUrl = null;
    this.cameraVisible = true;
  }

  sendPhoto(): void {
    if (!this.photoDataUrl || !this.selectedRow) {
      return;
    }

    const base64 = this.photoDataUrl.split(',')[1];

    this.loading = true;

    this.camundaService.signWithPhoto({
      expertOpinionId: this.selectedRow.expertOpinionId,
      patientId: this.selectedRow.patientId,
      iin: '031230650906',
      photo: base64
    })
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: response => {
          this.faceDataResponse = response;

          if (response.status === 'OK') {

            this.messageService.add({
              severity: 'success',
              summary: this.translationService.instant('COMMON.SUCCESS'),
              detail: 'Фото-верификация успешно пройдена'
            });

            this.cameraVisible = false;
            this.stopCamera();

            this.photoDataUrl = null;
            this.selectedRow = null;

            this.search();
            return;
          }

          if (response.status === 'NOT_RECOGNIZED') {

            this.messageService.add({
              severity: 'error',
              summary: this.translationService.instant('COMMON.ERROR'),
              detail: 'Личность не распознана. Попробуйте сделать фото повторно.'
            });

            return;
          }

          if (response.status === 'SERVICE_ERROR') {

            this.messageService.add({
              severity: 'error',
              summary: this.translationService.instant('COMMON.ERROR'),
              detail: 'Ошибка при вызове внешнего сервиса'
            });

            return;
          }

          this.messageService.add({
            severity: 'error',
            summary: this.translationService.instant('COMMON.ERROR'),
            detail: 'Фото-верификация не пройдена'
          });
        },

        error: err => {
          console.error('Ошибка фото-верификации:', err);

          this.messageService.add({
            severity: 'error',
            summary: this.translationService.instant('COMMON.ERROR'),
            detail: 'Ошибка при отправке фото'
          });
        }
      });
  }


  saveAndUpdateStatus(signXml: string, notificationXml: string): void {

    if (!this.selectedRow) {
      return;
    }

    this.edsLoading = true;

    this.camundaService.signAndUpdateStatus({
      expertOpinionId: this.selectedRow.expertOpinionId,
      signXml: signXml,
      notificationXml: notificationXml
    })
      .pipe(
        finalize(() => this.edsLoading = false)
      )
      .subscribe({
        next: result => {

          if (result === 'SUCCESS') {

            this.messageService.add({
              severity: 'success',
              summary: 'Успешно',
              detail: 'Экспертное заключение подписано'
            });

            this.selectedRow = null;

            this.search();

            return;
          }

          switch (result) {

            case 'SIGN_NOT_VALID':
              this.messageService.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: 'ЭЦП не прошла проверку'
              });
              break;

            case 'ACCESS_DENIED':
              this.messageService.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: 'Недостаточно прав'
              });
              break;

            case 'STATUS_ALREADY_CHANGED':
              this.messageService.add({
                severity: 'warning',
                summary: 'Предупреждение',
                detail: 'Статус заключения уже изменён'
              });
              this.search();
              break;

            case 'INVALID_STATUS':
              this.messageService.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: 'Недопустимый текущий статус'
              });
              this.search();
              break;

            default:
              this.messageService.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: 'Не удалось выполнить подписание'
              });
          }
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

}
