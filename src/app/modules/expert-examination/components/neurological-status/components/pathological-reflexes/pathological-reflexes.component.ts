import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { PathologicalReflexesDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-pathological-reflexes',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './pathological-reflexes.component.html',
  styleUrls: ['./pathological-reflexes.component.scss']
})
export class PathologicalReflexesComponent {
  @Input() public isExpanded = true;

  public model: PathologicalReflexesDTO = {
    rossolimo: { checked: false, value: '' },
    zhukovsky: { checked: false, value: '' },
    jacobsonLask: { checked: false, value: '' },
    bekhterev1: { checked: false, value: '' },
    bekhterev2: { checked: false, value: '' },
    babinski: { checked: false, value: '' },
    oppenheim: { checked: false, value: '' },
    gordon: { checked: false, value: '' },
    schaeffer: { checked: false, value: '' },
    marinescuRadovici: { checked: false, value: '' },
    handClonus: { checked: false, value: '' },
    footClonus: { checked: false, value: '' },
    patellarClonus: { checked: false, value: '' },
    bekhterevMarieFoix: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): PathologicalReflexesDTO {
    return this.model;
  }

  public setData(data: PathologicalReflexesDTO): void {
    this.model = data;
  }
}
