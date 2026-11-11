import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { NerveRootTensionSymptomsDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-nerve-root-tension-symptoms',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './nerve-root-tension-symptoms.component.html',
  styleUrls: ['./nerve-root-tension-symptoms.component.scss']
})
export class NerveRootTensionSymptomsComponent {
  @Input() public isExpanded = true;

  public model: NerveRootTensionSymptomsDTO = {
    sittingSymptom: { checked: false, value: '' },
    lasegueSymptom: { checked: false, value: '' },
    wassermanSymptom: { checked: false, value: '' },
    bekhterevSymptom: { checked: false, value: '' },
    mackiewiczSymptom: { checked: false, value: '' },
    neriSymptom: { checked: false, value: '' },
    spinousProcessSymptom: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): NerveRootTensionSymptomsDTO {
    return this.model;
  }

  public setData(data: NerveRootTensionSymptomsDTO): void {
    this.model = data;
  }
}
