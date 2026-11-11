import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphFundusDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-fundus',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './fundus.component.html',
  styleUrls: ['./fundus.component.scss']
})
export class OphFundusComponent {
  @Input() public isExpanded = true;

  public model: OphFundusDTO = {
    notOphthalmoscoped: { checked: false, value: '' },
    opticDisc: { checked: false, value: '' },
    bordersClear: { checked: false, value: '' },
    bordersBlurred: { checked: false, value: '' },
    opticDiscEdema: { checked: false, value: '' },
    peripapillaryStaphyloma: { checked: false, value: '' },
    maculaNoPathology: { checked: false, value: '' },
    reflexesPreserved: { checked: false, value: '' },
    retinaTransparent: { checked: false, value: '' },
    retinaEdema: { checked: false, value: '' },
    peripheralLaserCoagulates: { checked: false, value: '' },
    peripheralDegenerationFoci: { checked: false, value: '' },
    vesselsNormalCaliber: { checked: false, value: '' },
    vesselsConstricted: { checked: false, value: '' },
    vesselsDilated: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): OphFundusDTO {
    return this.model;
  }

  public setData(data: OphFundusDTO): void {
    this.model = data;
  }
}
