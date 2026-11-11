import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { TextInputFieldComponent } from '@shared/text-input-field/text-input-field.component';

import { RehabilitationDiagnosticsComponent } from './components/rehabilitation-diagnostics/rehabilitation-diagnostics.component';
import { RehabilitationRecommendationsComponent } from './components/rehabilitation-recommendations/rehabilitation-recommendations.component';
import { RehabilitationConclusionDTO } from './models/rehabilitation-conclusion.models';

const REHABILITATION_CONCLUSION_PREFIX = 'MAIN.EXAMINATION.EXPERT_EXAMINATION.REHABILITATION_CONCLUSION.';

@Component({
  selector: 'app-rehabilitation-conclusion',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    CollapsibleBlockComponent,
    TextInputFieldComponent,
    RehabilitationDiagnosticsComponent,
    RehabilitationRecommendationsComponent
  ],
  templateUrl: './rehabilitation-conclusion.component.html',
  styleUrls: ['./rehabilitation-conclusion.component.scss']
})
export class RehabilitationConclusionComponent {
  public translationPrefix = REHABILITATION_CONCLUSION_PREFIX;

  /** Поле "Специалист" хранится в родительском компоненте */
  public specialist = '';

  @ViewChild(RehabilitationDiagnosticsComponent) diagnosticsBlock!: RehabilitationDiagnosticsComponent;
  @ViewChild(RehabilitationRecommendationsComponent) recommendationsBlock!: RehabilitationRecommendationsComponent;

  public getData(): RehabilitationConclusionDTO {
    return {
      specialist: this.specialist,
      diagnostics: this.diagnosticsBlock.getData(),
      recommendations: this.recommendationsBlock.getData()
    };
  }

  public setData(data: RehabilitationConclusionDTO): void {
    this.specialist = data.specialist;
    this.diagnosticsBlock.setData(data.diagnostics);
    this.recommendationsBlock.setData(data.recommendations);
  }

  public onSave(): void {
    console.log('RehabilitationConclusionDTO:', this.getData());
  }
}
