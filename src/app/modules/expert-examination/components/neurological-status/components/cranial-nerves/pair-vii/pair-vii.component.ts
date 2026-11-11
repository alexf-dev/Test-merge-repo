import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { CranialNervePairVIIDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-cranial-nerve-pair-vii',
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
  templateUrl: './pair-vii.component.html',
  styleUrls: ['./pair-vii.component.scss']
})
export class CranialNervePairVIIComponent {
  @Input() public isExpanded = true;

  public model: CranialNervePairVIIDTO = {
    facialAsymmetry: { checked: false, value: '' },
    nasolabialForeheadFoldsSmoothed: { checked: false, value: '' },
    mouthCornerDropped: { checked: false, value: '' },
    lagophthalmos: { checked: false, value: '' },
    lacrimation: { checked: false, value: '' },
    dryEye: { checked: false, value: '' },
    tasteLossAnteriorTwoThirds: false,
    additionalInfo: ''
  };

  public getData(): CranialNervePairVIIDTO {
    return this.model;
  }

  public setData(data: CranialNervePairVIIDTO): void {
    this.model = data;
  }
}
