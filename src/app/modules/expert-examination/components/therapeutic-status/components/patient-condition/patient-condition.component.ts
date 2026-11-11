import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { DropdownFieldComponent, DropdownOption } from '@shared/dropdown-field/dropdown-field.component';

import { PatientConditionDTO } from '../../models/therapeutic-status.models';

const THERAPEUTIC_STATUS_PREFIX = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.THERAPEUTIC_STATUS.';

@Component({
  selector: 'app-patient-condition',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    DropdownFieldComponent
  ],
  templateUrl: './patient-condition.component.html',
  styleUrls: ['./patient-condition.component.scss']
})
export class PatientConditionComponent {
  public translationPrefix = THERAPEUTIC_STATUS_PREFIX;

  @Input() public isExpanded = true;

  /** Моки справочников: позже заменим на загрузку с бэка (D_PATIENT_STATUS_TYPE и т.д.) */
  public generalStatusOptions: DropdownOption[] = [
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'CONDITION.OPTIONS.GENERAL_STATUS.SATISFACTORY', value: 'SATISFACTORY' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'CONDITION.OPTIONS.GENERAL_STATUS.RELATIVELY_SATISFACTORY', value: 'RELATIVELY_SATISFACTORY' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'CONDITION.OPTIONS.GENERAL_STATUS.MODERATE', value: 'MODERATE' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'CONDITION.OPTIONS.GENERAL_STATUS.SEVERE', value: 'SEVERE' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'CONDITION.OPTIONS.GENERAL_STATUS.EXTREMELY_SEVERE', value: 'EXTREMELY_SEVERE' }
  ];

  public positionOptions: DropdownOption[] = [
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'CONDITION.OPTIONS.PATIENT_POSITION.ACTIVE', value: 'ACTIVE' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'CONDITION.OPTIONS.PATIENT_POSITION.PASSIVE', value: 'PASSIVE' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'CONDITION.OPTIONS.PATIENT_POSITION.FORCED', value: 'FORCED' }
  ];

  public bodyTypeOptions: DropdownOption[] = [
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'CONDITION.OPTIONS.BODY_TYPE.ASTHENIC', value: 'ASTHENIC' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'CONDITION.OPTIONS.BODY_TYPE.NORMOSTHENIC', value: 'NORMOSTHENIC' },
    { labelKey: THERAPEUTIC_STATUS_PREFIX + 'CONDITION.OPTIONS.BODY_TYPE.HYPERSTHENIC', value: 'HYPERSTHENIC' }
  ];

  public model: PatientConditionDTO = {
    noOrganPathology: false,
    generalStatus: null,
    patientPosition: null,
    bodyType: null
  };

  public getData(): PatientConditionDTO {
    return this.model;
  }

  public setData(data: PatientConditionDTO): void {
    this.model = data;
  }
}
