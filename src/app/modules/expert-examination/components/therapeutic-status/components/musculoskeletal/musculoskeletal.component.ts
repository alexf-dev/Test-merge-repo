import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { GroupTitleComponent } from '@shared/group-title/group-title.component';
import { DropdownFieldComponent, DropdownOption } from '@shared/dropdown-field/dropdown-field.component';

import { MusculoskeletalDTO } from '../../models/therapeutic-status.models';

const THERAPEUTIC_STATUS_PREFIX = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.THERAPEUTIC_STATUS.';

const emptyCheckComment = () => ({ checked: false, comment: '' });

@Component({
  selector: 'app-musculoskeletal',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    GroupTitleComponent,
    DropdownFieldComponent
  ],
  templateUrl: './musculoskeletal.component.html',
  styleUrls: ['./musculoskeletal.component.scss']
})
export class MusculoskeletalComponent {
  public translationPrefix = THERAPEUTIC_STATUS_PREFIX;

  @Input() public isExpanded = true;

  /** Мок справочника D_SPINE_DEFORMATION_TYPE: позже заменим на загрузку с бэка */
  public spineDeformationTypeOptions: DropdownOption[] = [
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'MUSCULOSKELETAL.SPINE.OPTIONS.DEFORMATION_TYPE.LORDOSIS', value: 'LORDOSIS' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'MUSCULOSKELETAL.SPINE.OPTIONS.DEFORMATION_TYPE.KYPHOSIS', value: 'KYPHOSIS' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'MUSCULOSKELETAL.SPINE.OPTIONS.DEFORMATION_TYPE.SCOLIOSIS', value: 'SCOLIOSIS' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'MUSCULOSKELETAL.SPINE.OPTIONS.DEFORMATION_TYPE.KYPHOSCOLIOSIS', value: 'KYPHOSCOLIOSIS' }
  ];

  public model: MusculoskeletalDTO = {
    visuallyUnchanged: true,
    joints: {
      enlargedInVolume: false,
      deformation: emptyCheckComment(),
      spindleShaped: false,
      painOnPalpation: emptyCheckComment(),
      limitedRangeOfMotion: emptyCheckComment(),
      fluctuation: emptyCheckComment(),
      lameness: false,
      inguinalFoldsSmoothed: false,
      thighAdductedAndFlexed: false,
      ankyloses: emptyCheckComment()
    },
    jointConfiguration: {
      normalConfiguration: true,
      skinShiny: false,
      contoursSmoothed: emptyCheckComment(),
      swelling: emptyCheckComment(),
      painOnTapping: emptyCheckComment(),
      drumstickFingers: emptyCheckComment(),
      movementsFullRange: emptyCheckComment(),
      crepitus: emptyCheckComment(),
      contractures: emptyCheckComment(),
      patellaBallottement: false,
      legDragging: false,
      legForcedPosition: false,
      legBentAtKnee: false
    },
    spine: {
      painOnBending: emptyCheckComment(),
      limitedMovement: emptyCheckComment(),
      spinousProcessProtrusion: emptyCheckComment(),
      hump: emptyCheckComment(),
      coldAbscesses: emptyCheckComment(),
      fistulas: emptyCheckComment(),
      reinSymptom: emptyCheckComment(),
      deformationType: null
    }
  };

  public getData(): MusculoskeletalDTO {
    return this.model;
  }

  public setData(data: MusculoskeletalDTO): void {
    this.model = data;
  }
}
