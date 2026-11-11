import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { CranialNervePairIIDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-cranial-nerve-pair-ii',
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
  templateUrl: './pair-ii.component.html',
  styleUrls: ['./pair-ii.component.scss']
})
export class CranialNervePairIIComponent {
  @Input() public isExpanded = true;

  public model: CranialNervePairIIDTO = {
    visualAcuityOD: { checked: false, value: '' },
    visualAcuityOS: { checked: false, value: '' },
    amblyopia: false,
    amaurosis: false,
    colorVisionPreserved: false,
    achromatopsia: false,
    dyschromatopsia: false,
    scotomas: false,
    homonymousHemianopia: { checked: false, value: '' },
    heteronymousHemianopia: { checked: false, value: '' },
    concentricVisualFieldConstriction: false,
    fundus: { checked: false, value: '' },
    visualHallucinations: false,
    additionalInfo: ''
  };

  public getData(): CranialNervePairIIDTO {
    return this.model;
  }

  public setData(data: CranialNervePairIIDTO): void {
    this.model = data;
  }
}
