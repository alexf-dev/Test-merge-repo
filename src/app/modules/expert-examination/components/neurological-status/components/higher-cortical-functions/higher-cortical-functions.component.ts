import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { PsychomotorDevelopmentComponent } from './psychomotor-development/psychomotor-development.component';
import { HigherCorticalFunctionsDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-higher-cortical-functions',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent,
    PsychomotorDevelopmentComponent
  ],
  templateUrl: './higher-cortical-functions.component.html',
  styleUrls: ['./higher-cortical-functions.component.scss']
})
export class HigherCorticalFunctionsComponent {
  @Input() public isExpanded = true;

  @ViewChild(PsychomotorDevelopmentComponent) psychomotorDevelopmentComponent!: PsychomotorDevelopmentComponent;

  public model: HigherCorticalFunctionsDTO = {
    asthenization: { checked: false, value: '' },
    mood: { checked: false, value: '' },
    emotions: { checked: false, value: '' },
    thinking: { checked: false, value: '' },
    speech: { checked: false, value: '' },
    orientation: { checked: false, value: '' },
    contactAccessibility: { checked: false, value: '' },
    memory: { checked: false, value: '' },
    attention: { checked: false, value: '' },
    intelligence: { checked: false, value: '' },
    interests: { checked: false, value: '' },
    behavior: { checked: false, value: '' },
    sleep: { checked: false, value: '' },
    psychomotorDevelopment: {} as any,
    additionalInfo: ''
  };

  public getData(): HigherCorticalFunctionsDTO {
    return {
      ...this.model,
      psychomotorDevelopment: this.psychomotorDevelopmentComponent.getData()
    };
  }

  public setData(data: HigherCorticalFunctionsDTO): void {
    this.model = { ...data };
    this.psychomotorDevelopmentComponent.setData(data.psychomotorDevelopment);
  }
}
