import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextInputFieldComponent } from '@shared/text-input-field/text-input-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { DropdownFieldComponent, DropdownOption } from '@shared/dropdown-field/dropdown-field.component';

import { DigestiveSystemDTO } from '../../models/therapeutic-status.models';

const THERAPEUTIC_STATUS_PREFIX = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.THERAPEUTIC_STATUS.';

const emptyCheckComment = () => ({ checked: false, comment: '' });

@Component({
  selector: 'app-digestive-system',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextInputFieldComponent,
    TextareaFieldComponent,
    DropdownFieldComponent
  ],
  templateUrl: './digestive-system.component.html',
  styleUrls: ['./digestive-system.component.scss']
})
export class DigestiveSystemComponent {
  public translationPrefix = THERAPEUTIC_STATUS_PREFIX;

  @Input() public isExpanded = true;

  /** Мок справочника D_HEPATIC_MARGIN_TYPE: позже заменим на загрузку с бэка */
  public liverMarginTypeOptions: DropdownOption[] = [
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'DIGESTIVE_SYSTEM.LIVER.OPTIONS.MARGIN_TYPE.SHARP', value: 'SHARP' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'DIGESTIVE_SYSTEM.LIVER.OPTIONS.MARGIN_TYPE.ROUNDED', value: 'ROUNDED' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'DIGESTIVE_SYSTEM.LIVER.OPTIONS.MARGIN_TYPE.SMOOTH', value: 'SMOOTH' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'DIGESTIVE_SYSTEM.LIVER.OPTIONS.MARGIN_TYPE.SOFT', value: 'SOFT' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'DIGESTIVE_SYSTEM.LIVER.OPTIONS.MARGIN_TYPE.SCALLOPED', value: 'SCALLOPED' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'DIGESTIVE_SYSTEM.LIVER.OPTIONS.MARGIN_TYPE.DENSE', value: 'DENSE' }
  ];

  public model: DigestiveSystemDTO = {
    tongue: {
      moist: true,
      dry: false,
      clean: true,
      coated: emptyCheckComment()
    },
    abdomen: {
      soft: true,
      painless: true,
      tense: false,
      normalSize: true,
      distended: false,
      enlargedDueToAscites: false,
      anteriorVeinsDilatation: false,
      painful: {
        inEpigastrium: false,
        inRightHypochondrium: false,
        inLeftHypochondrium: false,
        aroundNavel: false,
        abovePubis: false,
        inRightIliacRegion: false,
        inLeftIliacRegion: false
      }
    },
    liver: {
      notPalpable: true,
      alongCostalArch: false,
      protrudesFromRightHypochondrium: emptyCheckComment(),
      painful: false,
      painless: true,
      marginType: null,
      additionalInfo: ''
    },
    spleen: {
      palpable: false,
      notPalpable: true,
      dimensions: {
        transverse: '',
        longitudinal: ''
      }
    },
    physiologicalFunctions: {
      regular: true,
      constipationTendency: false,
      diarrheaTendency: false,
      additionalInfo: ''
    }
  };

  public getData(): DigestiveSystemDTO {
    return this.model;
  }

  public setData(data: DigestiveSystemDTO): void {
    this.model = data;
  }
}
