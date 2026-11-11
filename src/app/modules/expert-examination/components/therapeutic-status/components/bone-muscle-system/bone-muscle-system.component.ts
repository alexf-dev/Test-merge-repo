import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextInputFieldComponent } from '@shared/text-input-field/text-input-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { BoneMuscleSystemDTO } from '../../models/therapeutic-status.models';

const emptyCheckComment = () => ({ checked: false, comment: '' });

@Component({
  selector: 'app-bone-muscle-system',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextInputFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './bone-muscle-system.component.html',
  styleUrls: ['./bone-muscle-system.component.scss']
})
export class BoneMuscleSystemComponent {
  public translationPrefix = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.THERAPEUTIC_STATUS.';

  @Input() public isExpanded = true;

  public model: BoneMuscleSystemDTO = {
    noDeformations: true,
    deformation: emptyCheckComment(),
    dolichocephalic: false,
    brachycephalic: false,
    towerSkull: false,
    mesocrania: false,
    microcephaly: false,
    hydrocephaly: false,
    craniostenosis: false,
    additionalInfo: '',
    largeFontanel: ''
  };

  public getData(): BoneMuscleSystemDTO {
    return this.model;
  }

  public setData(data: BoneMuscleSystemDTO): void {
    this.model = data;
  }
}
