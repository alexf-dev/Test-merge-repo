import {Component, Input} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DictionaryService} from "../../../../core/service/dictionary.service";
import {DDoctype} from "../../../../core/model/dictionary/d-doctype";
import {ImageContentService} from "../../../../core/service/image-content.service";
import {forkJoin} from "rxjs";
import {DialogModule} from "primeng/dialog";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {CardModule} from "primeng/card";
import {MessageService} from "primeng/api";
import {TranslationService} from "../../../../core/service/translation.service";

type DocCard = {
  selected: boolean;
  fileId: number | null;
  fileName?: string | null;
  date?: string | null;
  doc: DDoctype;
};

@Component({
  selector: 'app-additional-documents',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    NgForOf,
    NgIf,
    FormsModule,
    DatePipe,
    DialogModule,
    CardModule
  ],
  templateUrl: './additional-documents.component.html',
  styleUrl: './additional-documents.component.css'
})
export class AdditionalDocumentsComponent {

  @Input() type!: string;
  @Input() patientId!: number;

  selectAllAdditional = false;

  dicDoctype: DDoctype[] = [];
  additionalDocs: DocCard[] = [];

  pdfDialogVisible = false;
  selectedFiles: DocCard[] = [];
  currentPdfIndex = 0;

  pdfSrc: SafeResourceUrl | null = null;
  rawPdfUrl: string | null = null;
  loadingPdf = false;

  file: File;
  selectedFileName: string;

  private readonly MAX_FILE_SIZE_MB = 1;

  constructor(
    private dictionaryService: DictionaryService,
    private imageContentService: ImageContentService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private translationService: TranslationService
  ) {
  }

  ngOnInit(): void {
    if (!this.patientId) {
      return;
    }

    forkJoin({
      doctypes: this.dictionaryService.loadDDoctype(),
      files: this.imageContentService.getImageContentByPatientId(this.patientId)
    }).subscribe({
      next: ({doctypes, files}) => {
        this.dicDoctype = doctypes ?? [];

        let filteredDocs: DDoctype[] = [];

        if (this.type === 'additional') {
          filteredDocs = this.dicDoctype.filter(item => item.isRequired === 0);
        } else if (this.type === 'composite') {
          filteredDocs = this.dicDoctype.filter(item => item.isCompasite === 1);
        } else if (this.type === 'guardian') {
          filteredDocs = this.dicDoctype.filter(item => item.isPvri === 1);
        } else {
          filteredDocs = this.dicDoctype;
        }

        this.additionalDocs = filteredDocs.map(doc => {
          const uploadedFile = files.find(f => f.doctypeId === doc.id);

          return {
            selected: false,
            doc,
            fileId: uploadedFile?.fileId ?? null,
            fileName: uploadedFile?.filename ?? null,
            date: uploadedFile?.dat ?? null
          };
        });

        this.updateSelectAllState();
      },
      error: (err) => {
        console.error('Ошибка загрузки документов', err);
      }
    });
  }

  toggleAll(): void {
    this.additionalDocs = this.additionalDocs.map(d => ({
      ...d,
      selected: d.fileId ? this.selectAllAdditional : false
    }));
  }

  toggleCard(card: DocCard): void {
    if (!card.fileId) {
      return;
    }

    card.selected = !card.selected;
    this.updateSelectAllState();
  }

  openSelectedDocuments(): void {
    this.selectedFiles = this.additionalDocs.filter(d => d.selected && d.fileId);

    if (!this.selectedFiles.length) {
      alert('Выберите хотя бы один загруженный документ');
      return;
    }

    this.currentPdfIndex = 0;
    this.pdfDialogVisible = true;
    this.loadCurrentPdf();
  }

  loadCurrentPdf(): void {
    const current = this.selectedFiles[this.currentPdfIndex];

    if (!current?.fileId) {
      this.pdfSrc = null;
      return;
    }

    if (this.rawPdfUrl) {
      URL.revokeObjectURL(this.rawPdfUrl);
      this.rawPdfUrl = null;
    }

    this.loadingPdf = true;

    this.imageContentService.getPdf(current.fileId).subscribe({
      next: (blob: Blob) => {
        const pdfBlob = new Blob([blob], {type: 'application/pdf'});
        this.rawPdfUrl = URL.createObjectURL(pdfBlob);
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawPdfUrl);
        this.loadingPdf = false;
      },
      error: (err) => {
        console.error('Ошибка загрузки PDF', err);
        this.loadingPdf = false;
        this.pdfSrc = null;
        alert('Не удалось загрузить PDF');
      }
    });
  }

  prevPdf(): void {
    if (this.currentPdfIndex > 0) {
      this.currentPdfIndex--;
      this.loadCurrentPdf();
    }
  }

  nextPdf(): void {
    if (this.currentPdfIndex < this.selectedFiles.length - 1) {
      this.currentPdfIndex++;
      this.loadCurrentPdf();
    }
  }

  onDialogHide(): void {
    if (this.rawPdfUrl) {
      URL.revokeObjectURL(this.rawPdfUrl);
      this.rawPdfUrl = null;
    }

    this.pdfSrc = null;
    this.loadingPdf = false;
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (!file) {
      this.file = null;
      return;
    }

    const isPdf =
      file.type === 'application/pdf' ||
      file.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      this.file = null;
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
    this.file = file;


  }

  private updateSelectAllState(): void {
    const availableDocs = this.additionalDocs.filter(d => !!d.fileId);

    this.selectAllAdditional =
      availableDocs.length > 0 &&
      availableDocs.every(d => d.selected);
  }

}
