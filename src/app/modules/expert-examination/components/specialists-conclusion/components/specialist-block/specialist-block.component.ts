import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { TextInputFieldComponent } from '@shared/text-input-field/text-input-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { SpecialistConclusionItemDTO, EMPTY_SPECIALIST_CONCLUSION_ITEM } from '../../models/specialist-conclusion.models';

const SPECIALIST_CONCLUSION_PREFIX = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.SPECIALIST_CONCLUSION.';

@Component({
  selector: 'app-specialist-block',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CollapsibleBlockComponent,
    TextInputFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './specialist-block.component.html',
  styleUrls: ['./specialist-block.component.scss']
})
export class SpecialistBlockComponent {
  @Input() public titleKey = '';
  @Input() public isExpanded = true;

  public translationPrefix = SPECIALIST_CONCLUSION_PREFIX;

  public model: SpecialistConclusionItemDTO = { ...EMPTY_SPECIALIST_CONCLUSION_ITEM };

  public getData(): SpecialistConclusionItemDTO {
    return this.model;
  }

  public setData(data: SpecialistConclusionItemDTO): void {
    this.model = data;
  }
}
