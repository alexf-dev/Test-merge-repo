import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../core/api.service";
import {TranslationService} from "../../../core/service/translation.service";
import {ActivatedRoute} from "@angular/router";
import {PersonDto} from "../../../dto/gbdfl-person-dto";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DictionaryService} from "../../../core/service/dictionary.service";
import {DictionaryValue} from "../../../core/model/dictionary-value";
import {MessageService} from "primeng/api";
import {Declaration} from "../../../core/model/declaration";

@Component({
  selector: 'app-msk-request-form',
  templateUrl: './msk-request-form.component.html',
  styleUrls: ['./msk-request-form.component.css']
})
export class MskRequestFormComponent implements OnInit {

  patient: PersonDto = {};
  guardian: PersonDto = {};
  declarationId: number;
  model: Declaration = null;
  appFile: File | null;
  dicAppDocs: DictionaryValue[];
  isDragging = false;
  errorMessage = '';
  showFormError = true;
  uploadProgress = 45;
  private readonly MAX_FILE_SIZE_MB = 10;
  private readonly ALLOWED_TYPES = [
    'application/pdf'
  ];

  constructor(private api: ApiService,
              private http: HttpClient,
              public translateService: TranslationService,
              private route: ActivatedRoute,
              private dictionaryService: DictionaryService,
              private translationService: TranslationService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initDeclarationId();

    if (!this.declarationId) {
      console.error('Некорректный id декларации');
      return;
    }

    this.loadDeclaration();
  }

  sign() {
    console.log('REQUEST DTO:', this.model);

    const errors = this.getFormErrors();

    if (errors.length > 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Заявление заполнено не полностью',
        detail: errors[0]
      });
      return;
    }

    this.model.iin = this.patient.iin;
    this.model.jsonData.fullName = this.getFullName(this.patient);
    this.model.jsonData.iin = this.patient.iin;

    if (!this.model.jsonData.file) return;

    this.api.put<Declaration>("/api/declaration", this.model).subscribe({
      next: response => {
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

  getFullName(person: PersonDto) {
    if (!person) {
      return '';
    }

    const surname = person.surname || '';
    const firstname = person.firstName || '';
    const secondname = person.secondName || '';

    // Пример: "АСТАНА, САРЫАРКА РАЙОН, С 409, 41, кв. 121"
    return surname + ' ' + firstname + ' ' + secondname;
  }

  exportDraft() {
    this.model.iin = this.patient.iin;

    this.http.post('https://test-cbdi-gateway.enbek.kz/api/doc/declaration', this.model, {
      responseType: 'blob' as 'blob'
    })
      .pipe(
        catchError(error => {
          console.error('Ошибка скачивания файла', error);
          return of(null);
        })
      )
      .subscribe((blob: Blob | null) => {
        if (!blob) {
          return;
        }

        const file = new Blob([blob], {type: 'application/pdf'});
        const url = window.URL.createObjectURL(file);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.model.iin}-msk.pdf`; // имя файла
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);
      });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.processFile(file);

    this.uploadProgress = 45;
    this.showFormError = false;
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    const file = event.dataTransfer?.files?.[0];
    if (!file) return;

    this.processFile(file);
    this.uploadProgress = 55;
    this.showFormError = true;
  }

  removeFile(): void {
    this.appFile = null;
    this.model.jsonData.file = null;
    this.errorMessage = null;
    this.uploadProgress = 55;
    this.showFormError = true;
  }

  formatBytes(bytes: number): string {
    const kb = bytes / 1024;
    if (kb < 1024) return `${Math.round(kb)} КБ`;
    return `${(kb / 1024).toFixed(1)} МБ`;
  }

  private initDeclarationId(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.declarationId = id !== null && !Number.isNaN(Number(id)) ? Number(id) : null;
  }

  private loadDeclaration(): void {
    this.api.get<Declaration>(`/api/declaration/${this.declarationId}`)
      .pipe(
        catchError(error => {
          console.error('Ошибка загрузки декларации', error);
          return of(null);
        })
      )
      .subscribe(declaration => {
        if (!declaration) {
          return;
        }

        this.model = declaration;
        this.initJsonData();
        this.loadDictionaryDocs();
        this.loadPatient();
        this.loadGuardian();
      });
  }

  private initJsonData(): void {
    if (!this.model.jsonData) {
      this.model.jsonData = this.createEmptyJsonData();
      return;
    }

    if (!this.model.jsonData.purposes) {
      this.model.jsonData.purposes = {
        disability: false,
        capacityLoss: false,
        ipr: false
      };
    }

    if (!this.model.jsonData.earlyReasons) {
      this.model.jsonData.earlyReasons = {
        agreePD: false,
        warnedFake: false,
        warnedChange: false
      };
    }

    if (!this.model.jsonData.docs) {
      this.model.jsonData.docs = [];
    }
  }

  private createEmptyJsonData() {
    return {
      iin: '',
      fullName: '',
      purposes: {
        disability: false,
        capacityLoss: false,
        ipr: false
      },
      docs: [],
      consentPlace: null,
      earlyReasons: {
        agreePD: false,
        warnedFake: false,
        warnedChange: false
      },
      smsCode: '',
      file: null
    };
  }

  private loadDictionaryDocs(): void {
    this.dictionaryService.load(138, 'd_app_doc').subscribe({
      next: res => {
        this.dicAppDocs = res;

        if (!this.model.jsonData.docs.length) {
          this.model.jsonData.docs = this.dicAppDocs.map(dic => ({
            dic,
            mode: null
          }));
        }
      },
      error: err => {
        console.error('Ошибка загрузки справочника документов', err);
      }
    });
  }

  private loadPatient(): void {
    if (!this.model?.iin) {
      return;
    }

    this.api.get<PersonDto>(`/api/kafka/send-gbdfl-by-iin/${this.model.iin}`)
      .pipe(
        catchError(error => {
          console.error('Ошибка загрузки пациента', error);
          return of(null);
        })
      )
      .subscribe(patient => {
        this.patient = patient;
      });
  }

  private loadGuardian(): void {
    if (!this.model?.guardianIin) {
      return;
    }

    this.api.get<PersonDto>(`/api/kafka/send-gbdfl-by-iin/${this.model.guardianIin}`)
      .pipe(
        catchError(error => {
          console.error('Ошибка загрузки пациента', error);
          return of(null);
        })
      )
      .subscribe(patient => {
        this.guardian = patient;
      });
  }

  private getFormErrors(): string[] {
    const errors: string[] = [];

    if (!this.model?.jsonData) {
      errors.push('Данные заявления не загружены');
      return errors;
    }

    const purposes = this.model.jsonData.purposes;
    const docs = this.model.jsonData.docs;
    const earlyReasons = this.model.jsonData.earlyReasons;

    const hasPurpose =
      !!purposes?.disability ||
      !!purposes?.capacityLoss ||
      !!purposes?.ipr;

    if (!hasPurpose) {
      errors.push('Выберите цель медико-социальной экспертизы');
    }

    if (!docs?.some(d => !!d.mode)) {
      errors.push('Укажите действие хотя бы для одного документа');
    }

    if (!this.model.jsonData.consentPlace) {
      errors.push('Выберите место проведения освидетельствования');
    }

    if (!earlyReasons?.agreePD) {
      errors.push('Подтвердите согласие на сбор и обработку персональных данных');
    }

    if (!earlyReasons?.warnedFake) {
      errors.push('Подтвердите предупреждение об ответственности за недостоверные сведения');
    }

    if (!earlyReasons?.warnedChange) {
      errors.push('Подтвердите предупреждение о возможном изменении группы инвалидности и пособия');
    }

    if (!this.model.jsonData.file) {
      errors.push('Загрузите файл');
    }

    return errors;
  }

  private processFile(file: File): void {
    this.errorMessage = null;

    if (!this.ALLOWED_TYPES.includes(file.type)) {
      this.errorMessage = 'Разрешены только PDF';
      return;
    }

    const sizeMb = file.size / 1024 / 1024;
    if (sizeMb > this.MAX_FILE_SIZE_MB) {
      this.errorMessage = `Максимальный размер файла ${this.MAX_FILE_SIZE_MB} МБ`;
      return;
    }

    this.appFile = file;
    this.convertFileToBase64(file);
  }

  private convertFileToBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;

      this.model.jsonData.file = result.split(',')[1];
    };

    reader.onerror = (error) => {
      console.error('Ошибка конвертации файла в Base64', error);
    };

    reader.readAsDataURL(file);
  }

}
