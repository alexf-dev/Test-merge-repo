import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { MotorSphereDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-motor-sphere',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './motor-sphere.component.html',
  styleUrls: ['./motor-sphere.component.scss']
})
export class MotorSphereComponent {
  @Input() public isExpanded = true;

  public model: MotorSphereDTO = {
    jointMovementVolume: { checked: false, value: '' },
    muscleStrength: { checked: false, value: '' },
    muscleAtrophy: { checked: false, value: '' },
    muscleHypotrophy: { checked: false, value: '' },
    muscleHypertrophy: { checked: false, value: '' },
    muscleHypertonus: { checked: false, value: '' },
    muscleHypotonus: { checked: false, value: '' },
    muscleAtonia: { checked: false, value: '' },
    monoparesis: { checked: false, value: '' },
    paraparesis: { checked: false, value: '' },
    hemiparesis: { checked: false, value: '' },
    triparesis: { checked: false, value: '' },
    tetraparesis: { checked: false, value: '' },
    monoplegia: { checked: false, value: '' },
    paraplegia: { checked: false, value: '' },
    hemiplegia: { checked: false, value: '' },
    triplegia: { checked: false, value: '' },
    tetraplegia: { checked: false, value: '' },
    fibrillations: { checked: false, value: '' },
    fascicularTwitching: { checked: false, value: '' },
    retractions: { checked: false, value: '' },
    contractures: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): MotorSphereDTO {
    return this.model;
  }

  public setData(data: MotorSphereDTO): void {
    this.model = data;
  }
}
