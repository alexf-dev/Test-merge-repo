import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { DropdownFieldComponent, DropdownOption } from '@shared/dropdown-field/dropdown-field.component';
import { TextInputFieldComponent } from '@shared/text-input-field/text-input-field.component';

import { RehabilitationDiagnosticsDTO } from '../../models/rehabilitation-conclusion.models';

const REHAB_PREFIX = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.REHABILITATION_CONCLUSION.';
const OPTIONS_PREFIX = REHAB_PREFIX + 'OPTIONS.';

/** TODO Мок справочника D_REHABILITATION_POTENTIAL */
const REHABILITATION_POTENTIAL_OPTIONS: DropdownOption[] = [
  { labelKey: OPTIONS_PREFIX + 'REHABILITATION_POTENTIAL.HIGH', value: 'HIGH' },
  { labelKey: OPTIONS_PREFIX + 'REHABILITATION_POTENTIAL.SATISFACTORY', value: 'SATISFACTORY' },
  { labelKey: OPTIONS_PREFIX + 'REHABILITATION_POTENTIAL.LOW', value: 'LOW' },
  { labelKey: OPTIONS_PREFIX + 'REHABILITATION_POTENTIAL.ABSENT', value: 'ABSENT' }
];

/** TODO Мок справочника D_REHABILITATION_PROGNOSIS */
const REHABILITATION_PROGNOSIS_OPTIONS: DropdownOption[] = [
  { labelKey: OPTIONS_PREFIX + 'REHABILITATION_PROGNOSIS.FAVORABLE', value: 'FAVORABLE' },
  { labelKey: OPTIONS_PREFIX + 'REHABILITATION_PROGNOSIS.RELATIVELY_FAVORABLE', value: 'RELATIVELY_FAVORABLE' },
  { labelKey: OPTIONS_PREFIX + 'REHABILITATION_PROGNOSIS.UNFAVORABLE', value: 'UNFAVORABLE' }
];

/** TODO Мок справочника D_CLINICAL_PROGNOSIS */
const CLINICAL_PROGNOSIS_OPTIONS: DropdownOption[] = [
  { labelKey: OPTIONS_PREFIX + 'CLINICAL_PROGNOSIS.FAVORABLE', value: 'FAVORABLE' },
  { labelKey: OPTIONS_PREFIX + 'CLINICAL_PROGNOSIS.RELATIVELY_FAVORABLE', value: 'RELATIVELY_FAVORABLE' },
  { labelKey: OPTIONS_PREFIX + 'CLINICAL_PROGNOSIS.UNFAVORABLE', value: 'UNFAVORABLE' },
  { labelKey: OPTIONS_PREFIX + 'CLINICAL_PROGNOSIS.DOUBTFUL', value: 'DOUBTFUL' }
];

@Component({
  selector: 'app-rehabilitation-diagnostics',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    DropdownFieldComponent,
    TextInputFieldComponent
  ],
  templateUrl: './rehabilitation-diagnostics.component.html',
  styleUrls: ['./rehabilitation-diagnostics.component.scss']
})
export class RehabilitationDiagnosticsComponent {
  @Input() public isExpanded = true;

  public translationPrefix = REHAB_PREFIX;

  public rehabilitationPotentialOptions = REHABILITATION_POTENTIAL_OPTIONS;
  public rehabilitationPrognosisOptions = REHABILITATION_PROGNOSIS_OPTIONS;
  public clinicalPrognosisOptions = CLINICAL_PROGNOSIS_OPTIONS;

  public model: RehabilitationDiagnosticsDTO = {
    rehabilitationPotential: null,
    rehabilitationPrognosis: null,
    rehabilitationPrognosisComment: '',
    clinicalPrognosis: null
  };

  public getData(): RehabilitationDiagnosticsDTO {
    return this.model;
  }

  public setData(data: RehabilitationDiagnosticsDTO): void {
    this.model = data;
  }
}
