import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { SkinReflexesDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-skin-reflexes',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './skin-reflexes.component.html',
  styleUrls: ['./skin-reflexes.component.scss']
})
export class SkinReflexesComponent {
  @Input() public isExpanded = true;

  public model: SkinReflexesDTO = {
    upperAbdominal: { checked: false, value: '' },
    middleAbdominal: { checked: false, value: '' },
    lowerAbdominal: { checked: false, value: '' },
    cremasteric: { checked: false, value: '' },
    anal: { checked: false, value: '' },
    gluteal: { checked: false, value: '' },
    plantar: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): SkinReflexesDTO {
    return this.model;
  }

  public setData(data: SkinReflexesDTO): void {
    this.model = data;
  }
}
