import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextInputFieldComponent } from '@shared/text-input-field/text-input-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { DropdownFieldComponent, DropdownOption } from '@shared/dropdown-field/dropdown-field.component';

import { RespiratorySystemDTO } from '../../models/therapeutic-status.models';

const THERAPEUTIC_STATUS_PREFIX = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.THERAPEUTIC_STATUS.';

const emptyCheckComment = () => ({ checked: false, comment: '' });

@Component({
  selector: 'app-respiratory-system',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextInputFieldComponent,
    TextareaFieldComponent,
    DropdownFieldComponent
  ],
  templateUrl: './respiratory-system.component.html',
  styleUrls: ['./respiratory-system.component.scss']
})
export class RespiratorySystemComponent {
  public translationPrefix = THERAPEUTIC_STATUS_PREFIX;

  @Input() public isExpanded = true;

  /** Мок справочника D_THORAX_TYPE: позже заменим на загрузку с бэка */
  public thoraxTypeOptions: DropdownOption[] = [
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'RESPIRATORY_SYSTEM.OPTIONS.THORAX_TYPE.ASYMMETRIC', value: 'ASYMMETRIC' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'RESPIRATORY_SYSTEM.OPTIONS.THORAX_TYPE.REGULAR', value: 'REGULAR' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'RESPIRATORY_SYSTEM.OPTIONS.THORAX_TYPE.BARREL', value: 'BARREL' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'RESPIRATORY_SYSTEM.OPTIONS.THORAX_TYPE.EMPHYSEMATOUS', value: 'EMPHYSEMATOUS' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'RESPIRATORY_SYSTEM.OPTIONS.THORAX_TYPE.RACHITIC', value: 'RACHITIC' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'RESPIRATORY_SYSTEM.OPTIONS.THORAX_TYPE.FUNNEL', value: 'FUNNEL' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'RESPIRATORY_SYSTEM.OPTIONS.THORAX_TYPE.KEEL', value: 'KEEL' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'RESPIRATORY_SYSTEM.OPTIONS.THORAX_TYPE.PARALYTIC', value: 'PARALYTIC' }
  ];

  /** Мок справочника D_DYSPNEA_TYPE: позже заменим на загрузку с бэка */
  public dyspneaTypeOptions: DropdownOption[] = [
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'RESPIRATORY_SYSTEM.OPTIONS.DYSPNEA_TYPE.INSPIRATORY', value: 'INSPIRATORY' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'RESPIRATORY_SYSTEM.OPTIONS.DYSPNEA_TYPE.EXPIRATORY', value: 'EXPIRATORY' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'RESPIRATORY_SYSTEM.OPTIONS.DYSPNEA_TYPE.MIXED', value: 'MIXED' }
  ];

  public model: RespiratorySystemDTO = {
    aphonia: false,
    hoarseness: false,
    huskiness: false,
    nasalVoice: false,
    nasalBreathing: true,
    openMouthBreathing: false,
    nasalWingsParticipation: false,
    accessoryMusclesParticipation: false,
    respiratoryRate: '',
    thoraxType: null,
    dyspneaType: null,
    suffocation: false,
    suffocationAdditionalInfo: '',
    percussion: {
      clearPulmonary: true,
      dullSound: emptyCheckComment(),
      tympanicSound: emptyCheckComment(),
      flatSound: false,
      boxSound: emptyCheckComment(),
      additionalInfo: ''
    },
    breathing: {
      vesicular: { checked: true, comment: '' },
      bronchial: emptyCheckComment(),
      harsh: emptyCheckComment(),
      dryRales: emptyCheckComment(),
      crepitation: emptyCheckComment(),
      weakening: emptyCheckComment(),
      mixed: emptyCheckComment(),
      noRales: { checked: true, comment: '' },
      moistRales: emptyCheckComment(),
      pleuralFrictionRub: emptyCheckComment(),
      additionalInfo: '',
      coughCharacter: {
        dry: false,
        moistNonProductive: false,
        moistProductive: false
      },
      coughTiming: {
        morning: false,
        evening: false,
        night: false
      },
      sputumAmount: '',
      sputumCharacter: {
        mucous: false,
        serous: false,
        purulent: false,
        mucopurulent: false,
        seropurulent: false,
        bloodyStreaks: false,
        bloodyClots: false,
        rusty: false
      },
      sputumColor: {
        colorless: false,
        whitishMucous: false,
        greenish: false,
        yellow: false,
        brown: false,
        pink: false,
        additionalInfo: ''
      },
      sputumOdor: {
        absent: false,
        musty: false,
        putrid: false,
        foul: false,
        additionalInfo: ''
      },
      hemoptysis: {
        constant: false,
        rare: false,
        frequent: false
      },
      hemoptysisSeverity: {
        significant: false,
        moderate: false,
        insignificant: false
      }
    }
  };

  public getData(): RespiratorySystemDTO {
    return this.model;
  }

  public setData(data: RespiratorySystemDTO): void {
    this.model = data;
  }
}
