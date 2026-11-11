import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { TextInputFieldComponent } from '@shared/text-input-field/text-input-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { SpecialistDataDTO } from '../../models/therapeutic-status.models';

@Component({
  selector: 'app-specialist-data',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    TextInputFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './specialist-data.component.html',
  styleUrls: ['./specialist-data.component.scss']
})
export class SpecialistDataComponent {
  public translationPrefix = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.THERAPEUTIC_STATUS.';

  @Input() public isExpanded = true;

  public model: SpecialistDataDTO = {
    specialist: '',
    additionalInfo: ''
  };

  public getData(): SpecialistDataDTO {
    return this.model;
  }

  public setData(data: SpecialistDataDTO): void {
    this.model = data;
  }
}
