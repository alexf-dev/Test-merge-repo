import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { CranialNervePairVDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-cranial-nerve-pair-v',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './pair-v.component.html',
  styleUrls: ['./pair-v.component.scss']
})
export class CranialNervePairVComponent {
  @Input() public isExpanded = true;

  public model: CranialNervePairVDTO = {
    jawMovementVolume: { checked: false, value: '' },
    masticatoryMuscleTension: { checked: false, value: '' },
    masticatoryMuscleTrophic: { checked: false, value: '' },
    facialPain: { checked: false, value: '' },
    trigeminalExitPointPain: { checked: false, value: '' },
    facialSkinSensitivity: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): CranialNervePairVDTO {
    return this.model;
  }

  public setData(data: CranialNervePairVDTO): void {
    this.model = data;
  }
}
