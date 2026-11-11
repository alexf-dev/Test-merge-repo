import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { JointsDTO } from '../../models/surgical-status.models';

@Component({
  selector: 'app-joints',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CheckboxModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './joints.component.html',
  styleUrls: ['./joints.component.scss']
})
export class JointsComponent {
  @Input() public isExpanded = true;

  public model: JointsDTO = {
    normalConfiguration: false,
    fullRangeOfMotion: false,
    swellingChecked: false,
    swelling: '',
    painChecked: false,
    pain: '',
    limitedMotionChecked: false,
    limitedMotion: '',
    crepitusChecked: false,
    crepitus: '',
    fluctuationChecked: false,
    fluctuation: '',
    contracturesChecked: false,
    contractures: '',
    ankylosesChecked: false,
    ankyloses: '',
    limitedAbductionChecked: false,
    limitedAbduction: '',
    clickSymptomChecked: false,
    clickSymptom: '',
    skinFoldAsymmetryChecked: false,
    skinFoldAsymmetry: '',
    limbShorteningChecked: false,
    limbShortening: '',
    externalRotationChecked: false,
    externalRotation: '',
    comment: ''
  };

  public getData(): JointsDTO {
    return this.model;
  }

  public setData(data: JointsDTO): void {
    this.model = data;
  }
}
