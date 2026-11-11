import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextInputFieldComponent } from '@shared/text-input-field/text-input-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { UrinarySystemDTO } from '../../models/therapeutic-status.models';

const emptyCheckComment = () => ({ checked: false, comment: '' });

@Component({
  selector: 'app-urinary-system',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextInputFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './urinary-system.component.html',
  styleUrls: ['./urinary-system.component.scss']
})
export class UrinarySystemComponent {
  public translationPrefix = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.THERAPEUTIC_STATUS.';

  @Input() public isExpanded = true;

  public model: UrinarySystemDTO = {
    freePainlessUrination: true,
    painfulUrination: false,
    urinaryIncontinence: false,
    localizedEdema: {
      onFace: false,
      onEyelids: false,
      onTrunk: false,
      onAbdomen: false,
      onLegs: false,
      additionalInfo: ''
    },
    dailyDiuresis: {
      adequate: true,
      polyuria: false,
      oliguria: false,
      anuria: false,
      nocturia: false,
      ischuria: false,
      pollakiuria: false,
      enuresis: false,
      additionalInfo: ''
    },
    kidneys: {
      percussionSymptom: {
        positive: emptyCheckComment(),
        negative: { checked: true, comment: '' },
        additionalInfo: ''
      }
    },
    peripheralVesselsPulsation: ''
  };

  public getData(): UrinarySystemDTO {
    return this.model;
  }

  public setData(data: UrinarySystemDTO): void {
    this.model = data;
  }
}
