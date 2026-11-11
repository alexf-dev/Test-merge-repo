import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { SkinMucousDTO } from '../../models/therapeutic-status.models';

const emptyCheckComment = () => ({ checked: false, comment: '' });

@Component({
  selector: 'app-skin-and-mucous',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './skin-and-mucous.component.html',
  styleUrls: ['./skin-and-mucous.component.scss']
})
export class SkinAndMucousComponent {
  public translationPrefix = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.THERAPEUTIC_STATUS.';

  @Input() public isExpanded = true;

  public model: SkinMucousDTO = {
    normalColor: true,
    cyanotic: emptyCheckComment(),
    nasolabialCyanosis: false,
    hyperemic: emptyCheckComment(),
    hemorrhages: emptyCheckComment(),
    xanthomas: emptyCheckComment(),
    depigmentation: emptyCheckComment(),
    drySkin: emptyCheckComment(),
    coldSkin: emptyCheckComment(),
    elasticity: emptyCheckComment(),
    pale: false,
    acrocyanosis: false,
    jaundiced: emptyCheckComment(),
    earthyColor: emptyCheckComment(),
    spiderVeins: emptyCheckComment(),
    pigmentation: emptyCheckComment(),
    rashes: emptyCheckComment(),
    moistSkin: emptyCheckComment(),
    skinTurgor: emptyCheckComment(),
    skinTurgorAdditionalInfo: ''
  };

  public getData(): SkinMucousDTO {
    return this.model;
  }

  public setData(data: SkinMucousDTO): void {
    this.model = data;
  }
}
