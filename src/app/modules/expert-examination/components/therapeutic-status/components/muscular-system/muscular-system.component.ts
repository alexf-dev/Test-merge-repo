import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { GroupTitleComponent } from '@shared/group-title/group-title.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { MuscularSystemDTO } from '../../models/therapeutic-status.models';

const emptyCheckComment = () => ({ checked: false, comment: '' });

@Component({
  selector: 'app-muscular-system',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    GroupTitleComponent,
    TextareaFieldComponent
  ],
  templateUrl: './muscular-system.component.html',
  styleUrls: ['./muscular-system.component.scss']
})
export class MuscularSystemComponent {
  public translationPrefix = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.THERAPEUTIC_STATUS.';

  @Input() public isExpanded = true;

  public model: MuscularSystemDTO = {
    development: {
      weaklyDeveloped: false,
      satisfactorilyDeveloped: true,
      wellDeveloped: false
    },
    trophic: {
      atrophy: emptyCheckComment(),
      hypertrophy: emptyCheckComment()
    },
    tone: {
      hypotonia: emptyCheckComment(),
      hypertonia: emptyCheckComment(),
      myotonia: emptyCheckComment()
    },
    toneAdditionalInfo: ''
  };

  public getData(): MuscularSystemDTO {
    return this.model;
  }

  public setData(data: MuscularSystemDTO): void {
    this.model = data;
  }
}
