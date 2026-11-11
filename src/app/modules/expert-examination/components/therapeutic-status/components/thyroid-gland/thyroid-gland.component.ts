import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextInputFieldComponent } from '@shared/text-input-field/text-input-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { ThyroidGlandDTO } from '../../models/therapeutic-status.models';

const emptyCheckComment = () => ({ checked: false, comment: '' });

@Component({
  selector: 'app-thyroid-gland',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextInputFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './thyroid-gland.component.html',
  styleUrls: ['./thyroid-gland.component.scss']
})
export class ThyroidGlandComponent {
  public translationPrefix = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.THERAPEUTIC_STATUS.';

  @Input() public isExpanded = true;

  public model: ThyroidGlandDTO = {
    notPalpable: true,
    enlarged: emptyCheckComment(),
    painless: emptyCheckComment(),
    painful: false,
    neckShape: '',
    neckShapeAdditionalInfo: ''
  };

  public getData(): ThyroidGlandDTO {
    return this.model;
  }

  public setData(data: ThyroidGlandDTO): void {
    this.model = data;
  }
}
