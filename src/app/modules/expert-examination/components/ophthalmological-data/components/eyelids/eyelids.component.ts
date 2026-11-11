import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphEyelidsDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-eyelids',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './eyelids.component.html',
  styleUrls: ['./eyelids.component.scss']
})
export class OphEyelidsComponent {
  @Input() public isExpanded = true;

  public model: OphEyelidsDTO = {
    withinNormal: { checked: false, value: '' },
    ptosis: { checked: false, value: '' },
    halfPtosis: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): OphEyelidsDTO {
    return this.model;
  }

  public setData(data: OphEyelidsDTO): void {
    this.model = data;
  }
}
