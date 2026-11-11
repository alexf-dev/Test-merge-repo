import {Component, Input} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {DialogModule} from "primeng/dialog";
import {DividerModule} from "primeng/divider";
import {FieldsetModule} from "primeng/fieldset";
import {AccordionModule} from "primeng/accordion";
import {AdditionalDocumentsComponent} from "./additional-documents/additional-documents.component";
import {IdentityCardComponent} from "./identity-card/identity-card.component";
import {FormDocumentsComponent} from "./form-documents/form-documents.component";

type Consultation = { title: string; date: string; org: string; selected?: boolean; };

type MandatoryRow = {
  id: string;
  name: string;
  requestDate: string;
  requested?: boolean;
  children?: { title: string; type?: string }[];
  consultations?: Consultation[];
  miniData?: { iin: string; fio: string; birthDate: string };
};

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    CalendarModule,
    CardModule,
    TableModule,
    FormsModule,
    NgClass,
    ProgressSpinnerModule,
    DialogModule,
    DividerModule,
    FieldsetModule,
    AccordionModule,
    NgIf,
    NgForOf,
    AdditionalDocumentsComponent,
    IdentityCardComponent,
    FormDocumentsComponent
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {

  @Input() patientId!: number;
  @Input() mainId!: number;

  expandedRowKeys: Record<string, boolean> = {f031: true};

  pdfDialogVisible = false;
  loadingPdf = false;
  pdfUrl: SafeResourceUrl | null = null;
  pdfObjectUrl: string | null = null;
  mandatoryDocs: MandatoryRow[] = [
    {
      id: 'f031',
      name: '031 форма',
      requestDate: '02.09.2013',
      children: [
        {title: 'Результаты консультаций специалистов', type: 'consultations'},
        {title: 'Результаты клинического, лабораторного, рентгенологического и других исследований;'},
        {title: 'Результаты о пролеченном(-ых), случае(-ях) стационарного лечения...'}
      ]
    },
    {
      id: 'idkz',
      name: 'Удостоверение личности гражданина Республики Казахстан',
      requestDate: '02.09.2013',
      children: [{title: 'Данные'}],
      miniData: {
        iin: '031230650906',
        fio: 'Жубанызы Айсина Асқарқызы',
        birthDate: '30.12.2003'
      }
    }
  ];

  disabilityRef = {
    no: '031230650906',
    date: new Date(2003, 11, 30),
    issuedBy: 'МВД РК'
  };

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
  }

  toggleRow(row: MandatoryRow) {
    const isExpanded = !!this.expandedRowKeys[row.id];
    this.expandedRowKeys = {...this.expandedRowKeys, [row.id]: !isExpanded};
  }

  onRequest(row: MandatoryRow) {
    row.requested = true;
  }

  onAttach(_row: MandatoryRow) {
  }

  onView(row: MandatoryRow) {

    if (row.id !== 'f031') {
      return;
    }

    const mainId = this.mainId;

    if (!mainId) {
      console.error('mainId не найден');
      return;
    }

    this.loadingPdf = true;

    this.http.get(`https://test-cbdi-gateway.enbek.kz/api/doc/031/${this.mainId}`, {
      responseType: 'blob'
    }).subscribe({
      next: (blob: Blob) => {

        const fileURL = URL.createObjectURL(blob);

        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);

        this.pdfDialogVisible = true;
        this.loadingPdf = false;
      },
      error: (err) => {
        console.error(err);
        this.loadingPdf = false;
      }
    });
  }

  closePdfDialog(): void {
    this.pdfDialogVisible = false;
    this.clearPdfUrl();
  }

  downloadPdf(): void {
    if (!this.pdfObjectUrl) {
      return;
    }

    const a = document.createElement('a');
    a.href = this.pdfObjectUrl;
    a.download = `incident-${this.mainId}.pdf`;
    a.click();
  }

  private clearPdfUrl(): void {
    this.pdfUrl = null;

    if (this.pdfObjectUrl) {
      URL.revokeObjectURL(this.pdfObjectUrl);
      this.pdfObjectUrl = null;
    }
  }
}
