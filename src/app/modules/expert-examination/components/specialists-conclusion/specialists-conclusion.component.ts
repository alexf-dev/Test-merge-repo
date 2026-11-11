import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

import { SpecialistBlockComponent } from './components/specialist-block/specialist-block.component';
import { SpecialistConclusionDTO } from './models/specialist-conclusion.models';

import { isBlockExpandedByConfig } from '../../expert-examination.config';


@Component({
  selector: 'app-specialists-conclusion',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    SpecialistBlockComponent
  ],
  templateUrl: './specialists-conclusion.component.html',
  styleUrls: ['./specialists-conclusion.component.scss']
})
export class SpecialistsConclusionComponent {
  @ViewChild('specialist1Block') specialist1Block!: SpecialistBlockComponent;
  @ViewChild('specialist2Block') specialist2Block!: SpecialistBlockComponent;

   public getData(): SpecialistConclusionDTO {
    return {
      specialist1: this.specialist1Block.getData(),
      specialist2: this.specialist2Block.getData()
    };
  }

  public setData(data: SpecialistConclusionDTO): void {
    this.specialist1Block.setData(data.specialist1);
    this.specialist2Block.setData(data.specialist2);
  }

  public onSave(): void {
    console.log('SpecialistConclusionDTO:', this.getData());
  }
}
