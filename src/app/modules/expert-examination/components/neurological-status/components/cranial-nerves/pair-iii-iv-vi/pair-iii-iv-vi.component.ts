import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { CranialNervePairIIIIVVIDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-cranial-nerve-pair-iii-iv-vi',
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
  templateUrl: './pair-iii-iv-vi.component.html',
  styleUrls: ['./pair-iii-iv-vi.component.scss']
})
export class CranialNervePairIIIIVVIComponent {
  @Input() public isExpanded = true;

  public model: CranialNervePairIIIIVVIDTO = {
    ptosis: { checked: false, value: '' },
    exophthalmos: { checked: false, value: '' },
    enophthalmos: { checked: false, value: '' },
    fullEyeMovement: false,
    upwardGazeParesis: { checked: false, value: '' },
    downwardGazeParesis: { checked: false, value: '' },
    convergentStrabismus: false,
    divergentStrabismus: false,
    equalPupils: false,
    anisocoria: false,
    miosis: { checked: false, value: '' },
    mydriasis: { checked: false, value: '' },
    directPupilLightReaction: { checked: false, value: '' },
    consensualPupilLightReaction: { checked: false, value: '' },
    convergence: { checked: false, value: '' },
    accommodation: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): CranialNervePairIIIIVVIDTO {
    return this.model;
  }

  public setData(data: CranialNervePairIIIIVVIDTO): void {
    this.model = data;
  }
}
