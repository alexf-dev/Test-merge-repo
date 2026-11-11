import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { HairNailsDTO } from '../../models/therapeutic-status.models';

const emptyCheckComment = () => ({ checked: false, comment: '' });

@Component({
  selector: 'app-hair-nails',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './hair-nails.component.html',
  styleUrls: ['./hair-nails.component.scss']
})
export class HairNailsComponent {
  public translationPrefix = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.THERAPEUTIC_STATUS.';

  @Input() public isExpanded = true;

  public model: HairNailsDTO = {
    malePatternHair: emptyCheckComment(),
    splitEnds: emptyCheckComment(),
    brittleNails: emptyCheckComment(),
    femalePatternHair: emptyCheckComment(),
    hairLoss: emptyCheckComment(),
    hairLossAdditionalInfo: ''
  };

  public getData(): HairNailsDTO {
    return this.model;
  }

  public setData(data: HairNailsDTO): void {
    this.model = data;
  }
}
