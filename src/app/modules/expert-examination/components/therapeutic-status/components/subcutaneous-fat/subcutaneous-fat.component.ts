import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextInputFieldComponent } from '@shared/text-input-field/text-input-field.component';

import { SubcutaneousFatDTO } from '../../models/therapeutic-status.models';

@Component({
  selector: 'app-subcutaneous-fat',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextInputFieldComponent
  ],
  templateUrl: './subcutaneous-fat.component.html',
  styleUrls: ['./subcutaneous-fat.component.scss']
})
export class SubcutaneousFatComponent {
  public translationPrefix = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.THERAPEUTIC_STATUS.';

  @Input() public isExpanded = true;

  public model: SubcutaneousFatDTO = {
    weaklyDeveloped: false,
    moderatelyDeveloped: true,
    excessivelyDeveloped: false,
    pastiness: ''
  };

  public getData(): SubcutaneousFatDTO {
    return this.model;
  }

  public setData(data: SubcutaneousFatDTO): void {
    this.model = data;
  }
}
