import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';

import { PharynxDTO } from '../../models/therapeutic-status.models';

@Component({
  selector: 'app-pharynx',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    CheckFieldComponent
  ],
  templateUrl: './pharynx.component.html',
  styleUrls: ['./pharynx.component.scss']
})
export class PharynxComponent {
  public translationPrefix = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.THERAPEUTIC_STATUS.';

  @Input() public isExpanded = true;

  public model: PharynxDTO = {
    pinkClean: true,
    loose: false,
    hyperemic: false
  };

  public getData(): PharynxDTO {
    return this.model;
  }

  public setData(data: PharynxDTO): void {
    this.model = data;
  }
}
