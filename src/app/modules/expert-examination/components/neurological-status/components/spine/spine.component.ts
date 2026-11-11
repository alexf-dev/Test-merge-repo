import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { DropdownFieldComponent, DropdownOption } from '@shared/dropdown-field/dropdown-field.component';
import { SpineDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-spine',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent,
    DropdownFieldComponent
  ],
  templateUrl: './spine.component.html',
  styleUrls: ['./spine.component.scss']
})
export class SpineComponent {
  @Input() public isExpanded = true;

  public model: SpineDTO = {
    deformities: null,
    paravertebralPointPalpation: { checked: false, value: '' },
    radicularPain: { checked: false, value: '' },
    backMuscleTension: { checked: false, value: '' },
    movementVolume: { checked: false, value: '' },
    additionalInfo: ''
  };

  public deformitiesOptions: DropdownOption[] = [
    { labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.NEUROLOGICAL_STATUS.SPINE.DEFORMITIES_OPTIONS.SCOLIOSIS', value: 'scoliosis' },
    { labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.NEUROLOGICAL_STATUS.SPINE.DEFORMITIES_OPTIONS.KYPHOSIS', value: 'kyphosis' },
    { labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.NEUROLOGICAL_STATUS.SPINE.DEFORMITIES_OPTIONS.KYPHOSCOLIOSIS', value: 'kyphoscoliosis' },
    { labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.NEUROLOGICAL_STATUS.SPINE.DEFORMITIES_OPTIONS.LORDOSIS', value: 'lordosis' },
    { labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.NEUROLOGICAL_STATUS.SPINE.DEFORMITIES_OPTIONS.LORDOSIS_SMOOTHED', value: 'lordosis_smoothed' },
    { labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.NEUROLOGICAL_STATUS.SPINE.DEFORMITIES_OPTIONS.HYPERLORDOSIS', value: 'hyperlordosis' },
    { labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.NEUROLOGICAL_STATUS.SPINE.DEFORMITIES_OPTIONS.HUMP', value: 'hump' }
  ];

  public getData(): SpineDTO {
    return this.model;
  }

  public setData(data: SpineDTO): void {
    this.model = data;
  }
}
