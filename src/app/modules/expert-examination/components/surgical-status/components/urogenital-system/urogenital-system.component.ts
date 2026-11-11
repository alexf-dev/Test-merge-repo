import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { UrogenitalSystemDTO } from '../../models/surgical-status.models';

@Component({
  selector: 'app-urogenital-system',
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
  templateUrl: './urogenital-system.component.html',
  styleUrls: ['./urogenital-system.component.scss']
})
export class UrogenitalSystemComponent {
  @Input() public isExpanded = true;

  public model: UrogenitalSystemDTO = {
    edemaChecked: false,
    edema: '',
    percussionSymptomChecked: false,
    percussionSymptom: '',
    normalUrination: false,
    painfulUrination: false,
    additionalInfo: ''
  };

  public getData(): UrogenitalSystemDTO {
    return this.model;
  }

  public setData(data: UrogenitalSystemDTO): void {
    this.model = data;
  }
}
