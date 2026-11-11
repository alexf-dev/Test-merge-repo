import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphVisualAcuityDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-visual-acuity',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './visual-acuity.component.html',
  styleUrls: ['./visual-acuity.component.scss']
})
export class OphVisualAcuityComponent {
  @Input() public isExpanded = true;

  public model: OphVisualAcuityDTO = {
    odWithoutCorrection: { checked: false, value: '' },
    osWithoutCorrection: { checked: false, value: '' },
    odWithCorrection: { checked: false, value: '' },
    osWithCorrection: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): OphVisualAcuityDTO {
    return this.model;
  }

  public setData(data: OphVisualAcuityDTO): void {
    this.model = data;
  }
}
