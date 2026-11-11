import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextInputFieldComponent } from '@shared/text-input-field/text-input-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { CardiovascularSystemDTO } from '../../models/therapeutic-status.models';

const emptyCheckComment = () => ({ checked: false, comment: '' });

@Component({
  selector: 'app-cardiovascular-system',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextInputFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './cardiovascular-system.component.html',
  styleUrls: ['./cardiovascular-system.component.scss']
})
export class CardiovascularSystemComponent {
  public translationPrefix = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.THERAPEUTIC_STATUS.';

  @Input() public isExpanded = true;

  public model: CardiovascularSystemDTO = {
    dyspnea: {
      atRest: false,
      onPhysicalLoad: true,
      onExcitement: false,
      additionalInfo: ''
    },
    cardiacHump: '',
    apicalImpulse: '',
    cardiacImpulse: '',
    carotidDance: '',
    mussiSymptom: '',
    capillaryPulse: '',
    venousPulse: '',
    epigastricPulsation: '',
    catPurr: {
      overHeartApex: false,
      overAorta: false,
      overPulmonaryArtery: false
    },
    peripheralVesselsPulsation: '',
    heartBorders: {
      withinNormalRange: true,
      upper: emptyCheckComment(),
      right: emptyCheckComment(),
      left: emptyCheckComment()
    },
    heartSounds: {
      clear: true,
      muffled: false,
      accentIIOnPulmonaryArtery: false,
      systolicMurmur: false,
      subdued: false,
      accentIIOnAorta: false,
      rhythmic: true,
      diastolicMurmur: false,
      additionalInfo: ''
    },
    heartRate: { checked: true, comment: '72' },
    arrhythmia: {
      tachycardia: false,
      bradycardia: false,
      extrasystole: false,
      atrialFibrillation: false,
      paroxysmalTachycardia: false,
      additionalInfo: ''
    },
    firstSoundSplitting: emptyCheckComment(),
    gallopRhythm: emptyCheckComment(),
    systolicMurmur: emptyCheckComment(),
    secondSoundSplitting: emptyCheckComment(),
    quailRhythm: emptyCheckComment(),
    diastolicMurmur: emptyCheckComment(),
    bloodPressure: '120/80',
    pulse: {
      rhythmic: true,
      arrhythmic: emptyCheckComment(),
      ratePerMinute: emptyCheckComment(),
      additionalInfo: ''
    }
  };

  public getData(): CardiovascularSystemDTO {
    return this.model;
  }

  public setData(data: CardiovascularSystemDTO): void {
    this.model = data;
  }
}
