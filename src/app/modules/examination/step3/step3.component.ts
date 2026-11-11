import { Component } from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css'
})
export class Step3Component {
  mainAccordionOpen = true;
  subAccordions = [true, false, false];

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
