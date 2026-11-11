import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {DialogModule} from "primeng/dialog";
import {CamundaService} from "../../../../core/service/camunda.service";
import {DocumentsDto} from "../../../../core/model/documents-dto";

interface AppendixDoc {
  id?: number;
  name: string;
  org: string;
  fileId?: number | null;
  selected?: boolean;
  dat?: Date;
  startDate?: Date;
  dischargeDate?: Date;
  dischargeNum?: string;
  operationCodeName?: string;
}

type SectionType = 'consultation' | 'clinical' | 'treatment';

@Component({
  selector: 'app-form-documents',
  standalone: true,
  imports: [
    ButtonModule,
    NgIf,
    NgForOf,
    CheckboxModule,
    FormsModule,
    DialogModule,
    DatePipe
  ],
  templateUrl: './form-documents.component.html',
  styleUrl: './form-documents.component.css'
})
export class FormDocumentsComponent {

  @Input() mainId!: number;

  consultExpanded = false;
  clinicalExpanded = false;
  treatmentExpanded = false;

  selectAllConsultation = false;
  selectAllClinical = false;
  selectAllTreatment = false;

  pdfDialogVisible = false;
  loadingPdf = false;
  pdfSrc: SafeResourceUrl | null = null;
  currentPdfIndex = 0;
  selectedFiles: AppendixDoc[] = [];

  private objectUrl: string | null = null;

  consultationDocs: AppendixDoc[] = [];
  clinicalDocs: AppendixDoc[] = [];
  treatmentDocs: AppendixDoc[] = [];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private camundaService: CamundaService
  ) {}

  ngOnInit(): void {
    if (this.mainId) {
      this.loadDocuments();
    }
  }

  loadDocuments(): void {
    this.camundaService.getDocuments(this.mainId).subscribe({
      next: (res) => {

        this.consultationDocs = this.mapDocs(res.group1);
        this.clinicalDocs = this.mapDocs(res.group2);
        this.treatmentDocs = this.mapDocs(res.group3);

      },
      error: err => {
        console.error('Ошибка загрузки документов', err);
      }
    });
  }

  mapDocs(docs: DocumentsDto[]): AppendixDoc[] {
    if (!docs) return [];

    return docs.map(d => ({
      name: d.name,
      org: d.org,
      fileId: d.fileId,
      selected: false,
      dat: d.dat,
      startDate: d.startDate,
      dischargeDate: d.dischargeDate,
      dischargeNum: d.dischargeNum,
      operationCodeName: d.operationCodeName
    }));
  }

  getPdf(id: number) {
    return this.http.get(
      `https://test-cbdi-gateway.enbek.kz/api/examination/image/pdf/${id}`,
      {
        responseType: 'blob'
      }
    );
  }

  getSelectedDocs(docs: AppendixDoc[]): AppendixDoc[] {
    return docs.filter(doc => !!doc.selected && !!doc.fileId);
  }

  get allSelectedAppendixDocs(): AppendixDoc[] {
    return [
      ...this.getSelectedDocs(this.consultationDocs),
      ...this.getSelectedDocs(this.clinicalDocs),
      ...this.getSelectedDocs(this.treatmentDocs)
    ];
  }

  toggleCard(doc: AppendixDoc, docs: AppendixDoc[], section: SectionType): void {
    if (!doc.fileId) {
      return;
    }

    doc.selected = !doc.selected;
    this.syncSelectAll(section, docs);
  }

  toggleAllSection(docs: AppendixDoc[], checked: boolean): void {
    docs.forEach(doc => {
      doc.selected = !!doc.fileId && checked;
    });
  }

  syncSelectAll(section: SectionType, docs: AppendixDoc[]): void {
    const availableDocs = docs.filter(doc => !!doc.fileId);
    const allChecked =
      availableDocs.length > 0 &&
      availableDocs.every(doc => !!doc.selected);

    if (section === 'consultation') {
      this.selectAllConsultation = allChecked;
    } else if (section === 'clinical') {
      this.selectAllClinical = allChecked;
    } else {
      this.selectAllTreatment = allChecked;
    }
  }

  viewSingleDocument(doc: AppendixDoc): void {
    if (!doc.fileId) {
      return;
    }

    this.selectedFiles = [doc];
    this.currentPdfIndex = 0;
    this.pdfDialogVisible = true;
    this.loadPdf(doc.fileId);
  }

  openSelectedDocuments(docs: AppendixDoc[]): void {
    const selected = this.getSelectedDocs(docs);
    if (!selected.length) {
      return;
    }

    this.selectedFiles = selected;
    this.currentPdfIndex = 0;
    this.pdfDialogVisible = true;
    this.loadPdf(selected[0].fileId!);
  }

  openAllSelectedAppendixDocuments(): void {
    const selected = this.allSelectedAppendixDocs;
    if (!selected.length) {
      return;
    }

    this.selectedFiles = selected;
    this.currentPdfIndex = 0;
    this.pdfDialogVisible = true;
    this.loadPdf(selected[0].fileId!);
  }

  prevPdf(): void {
    if (this.currentPdfIndex <= 0) {
      return;
    }

    this.currentPdfIndex--;
    const current = this.selectedFiles[this.currentPdfIndex];
    if (current?.fileId) {
      this.loadPdf(current.fileId);
    }
  }

  nextPdf(): void {
    if (this.currentPdfIndex >= this.selectedFiles.length - 1) {
      return;
    }

    this.currentPdfIndex++;
    const current = this.selectedFiles[this.currentPdfIndex];
    if (current?.fileId) {
      this.loadPdf(current.fileId);
    }
  }

  loadPdf(fileId: number): void {
    this.loadingPdf = true;
    this.pdfSrc = null;
    this.clearObjectUrl();

    this.getPdf(fileId).subscribe({
      next: (blob: Blob) => {
        this.objectUrl = URL.createObjectURL(blob);
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.objectUrl);
        this.loadingPdf = false;
      },
      error: (error) => {
        console.error('Ошибка загрузки PDF', error);
        this.loadingPdf = false;
        this.pdfSrc = null;
      }
    });
  }

  onDialogHide(): void {
    this.pdfDialogVisible = false;
    this.loadingPdf = false;
    this.selectedFiles = [];
    this.currentPdfIndex = 0;
    this.pdfSrc = null;
    this.clearObjectUrl();
  }

  clearObjectUrl(): void {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
  }
}
