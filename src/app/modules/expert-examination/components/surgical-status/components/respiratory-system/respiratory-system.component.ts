import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { RespiratorySystemDTO } from '../../models/surgical-status.models';

@Component({
  selector: 'app-respiratory-system',
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
  templateUrl: './respiratory-system.component.html',
  styleUrls: ['./respiratory-system.component.scss']
})
export class RespiratorySystemComponent {
  @Input() public isExpanded = true;

  public model: RespiratorySystemDTO = {
    vesicularBreathing: false,
    lungRalesChecked: false,
    lungRales: '',
    clearPercussion: false,
    dullPercussionChecked: false,
    dullPercussion: '',
    additionalInfo: ''
  };

  public getData(): RespiratorySystemDTO {
    return this.model;
  }

  public setData(data: RespiratorySystemDTO): void {
    this.model = data;
  }
}
