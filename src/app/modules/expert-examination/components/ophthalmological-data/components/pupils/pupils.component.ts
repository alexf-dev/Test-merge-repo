import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphPupilsDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-pupils',
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
  templateUrl: './pupils.component.html',
  styleUrls: ['./pupils.component.scss']
})
export class OphPupilsComponent {
  @Input() public isExpanded = true;

  public model: OphPupilsDTO = {
    blackColor: false,
    roundShape: false,
    mediumSize: { checked: false, value: '' },
    sizes: { checked: false, value: '' },
    constricted: { checked: false, value: '' },
    dilated: { checked: false, value: '' },
    pupilOcclusion: { checked: false, value: '' },
    directLightReaction: { checked: false, value: '' },
    consensualLightReaction: { checked: false, value: '' },
    pseudoexfoliations: false,
    additionalInfo: ''
  };

  public getData(): OphPupilsDTO {
    return this.model;
  }

  public setData(data: OphPupilsDTO): void {
    this.model = data;
  }
}
