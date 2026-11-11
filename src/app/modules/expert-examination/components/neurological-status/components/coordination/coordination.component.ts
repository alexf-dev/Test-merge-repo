import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { DropdownFieldComponent, DropdownOption } from '@shared/dropdown-field/dropdown-field.component';
import { CoordinationDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-coordination',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent,
    DropdownFieldComponent
  ],
  templateUrl: './coordination.component.html',
  styleUrls: ['./coordination.component.scss']
})
export class CoordinationComponent {
  @Input() public isExpanded = true;

  public model: CoordinationDTO = {
    ataxia: null,
    tremor: null,
    eyelidFingerTremor: false,
    missTargetedMovements: false,
    nystagmus: { checked: false, value: '' },
    scannedSpeech: false,
    rombergPosition: { checked: false, value: '' },
    fingerNoseTest: { checked: false, value: '' },
    kneeHeelTest: { checked: false, value: '' },
    additionalInfo: ''
  };

  public ataxiaOptions: DropdownOption[] = [
    { labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.NEUROLOGICAL_STATUS.COORDINATION.ATAXIA_OPTIONS.CEREBELLAR', value: 'cerebellar' },
    { labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.NEUROLOGICAL_STATUS.COORDINATION.ATAXIA_OPTIONS.CORTICAL', value: 'cortical' },
    { labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.NEUROLOGICAL_STATUS.COORDINATION.ATAXIA_OPTIONS.VESTIBULAR', value: 'vestibular' },
    { labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.NEUROLOGICAL_STATUS.COORDINATION.ATAXIA_OPTIONS.POSTERIOR_COLUMN', value: 'posterior_column' }
  ];

  public tremorOptions: DropdownOption[] = [
    { labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.NEUROLOGICAL_STATUS.COORDINATION.TREMOR_OPTIONS.STATIC', value: 'static' },
    { labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.NEUROLOGICAL_STATUS.COORDINATION.TREMOR_OPTIONS.INTENTIONAL', value: 'intentional' },
    { labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.NEUROLOGICAL_STATUS.COORDINATION.TREMOR_OPTIONS.LARGE_AMPLITUDE', value: 'large_amplitude' },
    { labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.NEUROLOGICAL_STATUS.COORDINATION.TREMOR_OPTIONS.SMALL_AMPLITUDE', value: 'small_amplitude' }
  ];

  public getData(): CoordinationDTO {
    return this.model;
  }

  public setData(data: CoordinationDTO): void {
    this.model = data;
  }
}
