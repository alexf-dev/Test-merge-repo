import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphEyeballsDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-eyeballs',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './eyeballs.component.html',
  styleUrls: ['./eyeballs.component.scss']
})
export class OphEyeballsComponent {
  @Input() public isExpanded = true;

  public model: OphEyeballsDTO = {
    symmetrical: false,
    shiftedForward: { checked: false, value: '' },
    shiftedBackward: { checked: false, value: '' },
    shiftedInward: { checked: false, value: '' },
    shiftedOutward: { checked: false, value: '' },
    mobileAllDirections: { checked: false, value: '' },
    anophthalmos: { checked: false, value: '' },
    prosthetized: { checked: false, value: '' },
    notProsthetized: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): OphEyeballsDTO {
    return this.model;
  }

  public setData(data: OphEyeballsDTO): void {
    this.model = data;
  }
}
