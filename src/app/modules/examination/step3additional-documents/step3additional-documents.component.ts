import { Component } from '@angular/core';

@Component({
  selector: 'app-step3additional-documents',
  templateUrl: './step3additional-documents.component.html',
  styleUrl: './step3additional-documents.component.css'
})
export class Step3additionalDocumentsComponent {
  mainAccordionOpen = false;
  subAccordions = [false, false, false];

  toggleMainAccordion() {
    this.mainAccordionOpen = !this.mainAccordionOpen;
    if (!this.mainAccordionOpen) {
      this.subAccordions = [false, false, false];
    }
  }

  toggleSubAccordion(index: number) {
    this.subAccordions[index] = !this.subAccordions[index];
  }
}
