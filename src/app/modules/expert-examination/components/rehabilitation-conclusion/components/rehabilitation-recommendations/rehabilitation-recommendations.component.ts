import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { RehabilitationRecommendationsDTO } from '../../models/rehabilitation-conclusion.models';

/**
 * Раскрывающийся блок "Рекомендации по реабилитации" для раздела 4.
 */
@Component({
  selector: 'app-rehabilitation-recommendations',
  standalone: true,
  imports: [
    CommonModule,
    CollapsibleBlockComponent,
    TextareaFieldComponent
  ],
  templateUrl: './rehabilitation-recommendations.component.html',
  styleUrls: ['./rehabilitation-recommendations.component.scss']
})
export class RehabilitationRecommendationsComponent {
  @Input() public isExpanded = true;

  public translationPrefix = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.REHABILITATION_CONCLUSION.';

  public model: RehabilitationRecommendationsDTO = {
    socialRehabilitation: '',
    professionalRehabilitation: ''
  };

  public getData(): RehabilitationRecommendationsDTO {
    return this.model;
  }

  public setData(data: RehabilitationRecommendationsDTO): void {
    this.model = data;
  }
}
