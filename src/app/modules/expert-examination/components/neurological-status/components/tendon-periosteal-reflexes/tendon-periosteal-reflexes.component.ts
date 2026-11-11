import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { TendonPeriostealReflexesDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-tendon-periosteal-reflexes',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './tendon-periosteal-reflexes.component.html',
  styleUrls: ['./tendon-periosteal-reflexes.component.scss']
})
export class TendonPeriostealReflexesComponent {
  @Input() public isExpanded = true;

  public model: TendonPeriostealReflexesDTO = {
    dEqualsS: false,
    dGreaterThanSByHemitype: false,
    sGreaterThanDByHemitype: false,
    normal: false,
    increased: false,
    uniformlyDecreased: false,
    decreasedInDistal: false,
    decreased: { checked: false, value: '' },
    mandibular: { checked: false, value: '' },
    supraorbital: { checked: false, value: '' },
    biceps: { checked: false, value: '' },
    triceps: { checked: false, value: '' },
    carporadial: { checked: false, value: '' },
    costabdominal: { checked: false, value: '' },
    scapulohumeral: { checked: false, value: '' },
    pubic: { checked: false, value: '' },
    knee: { checked: false, value: '' },
    achilles: { checked: false, value: '' },
    plantar: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): TendonPeriostealReflexesDTO {
    return this.model;
  }

  public setData(data: TendonPeriostealReflexesDTO): void {
    this.model = data;
  }
}
