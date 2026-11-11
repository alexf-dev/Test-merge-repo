import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { CranialNervePairXIDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-cranial-nerve-pair-xi',
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
  templateUrl: './pair-xi.component.html',
  styleUrls: ['./pair-xi.component.scss']
})
export class CranialNervePairXIComponent {
  @Input() public isExpanded = true;

  public model: CranialNervePairXIDTO = {
    headRotationDifficulty: { checked: false, value: '' },
    shoulderDropped: { checked: false, value: '' },
    armElevationLimited: { checked: false, value: '' },
    trapeziusSternocleidomastoidTension: { checked: false, value: '' },
    trapeziusSternocleidomastoidTrophic: { checked: false, value: '' },
    congenitalTorticollis: false,
    acquiredTorticollis: false,
    additionalInfo: ''
  };

  public getData(): CranialNervePairXIDTO {
    return this.model;
  }

  public setData(data: CranialNervePairXIDTO): void {
    this.model = data;
  }
}
