import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { LymphNodesDTO } from '../../models/surgical-status.models';

@Component({
  selector: 'app-lymph-nodes',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CheckboxModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './lymph-nodes.component.html',
  styleUrls: ['./lymph-nodes.component.scss']
})
export class LymphNodesComponent {
  @Input() public isExpanded = true;

  public model: LymphNodesDTO = {
    notPalpable: false,
    notEnlarged: false,
    enlarged: {
      submandibular: false,
      cervical: false,
      supraclavicular: false,
      infraclavicular: false,
      elbow: false,
      axillary: false,
      inguinal: false
    },
    mobile: false,
    painfulChecked: false,
    painful: '',
    notMatted: false,
    matted: false,
    dense: false,
    additionalInfo: ''
  };

  public getData(): LymphNodesDTO {
    return this.model;
  }

  public setData(data: LymphNodesDTO): void {
    this.model = data;
  }
}
