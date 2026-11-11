import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { GroupTitleComponent } from '@shared/group-title/group-title.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { LymphNodesDTO } from '../../models/therapeutic-status.models';

const emptyCheckComment = () => ({ checked: false, comment: '' });

@Component({
  selector: 'app-lymph-nodes',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    GroupTitleComponent,
    TextareaFieldComponent
  ],
  templateUrl: './lymph-nodes.component.html',
  styleUrls: ['./lymph-nodes.component.scss']
})
export class LymphNodesComponent {
  public translationPrefix = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.THERAPEUTIC_STATUS.';

  @Input() public isExpanded = true;

  public model: LymphNodesDTO = {
    notEnlarged: true,
    painless: true,
    enlarged: {
      submandibular: false,
      cervical: false,
      supraclavicular: false,
      infraclavicular: false,
      axillary: false,
      elbow: false
    },
    painful: false,
    notMatted: true,
    matted: emptyCheckComment(),
    mattedAdditionalInfo: ''
  };

  public getData(): LymphNodesDTO {
    return this.model;
  }

  public setData(data: LymphNodesDTO): void {
    this.model = data;
  }
}
