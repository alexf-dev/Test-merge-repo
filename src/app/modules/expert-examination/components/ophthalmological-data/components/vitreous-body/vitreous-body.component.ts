import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphVitreousBodyDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-vitreous-body',
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
  templateUrl: './vitreous-body.component.html',
  styleUrls: ['./vitreous-body.component.scss']
})
export class OphVitreousBodyComponent {
  @Input() public isExpanded = true;

  public model: OphVitreousBodyDTO = {
    transparent: { checked: false, value: '' },
    notObservable: { checked: false, value: '' },
    opacity: { checked: false, value: '' },
    marked: false,
    moderatelyMarked: false,
    total: false,
    impregnatedWithHeme: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): OphVitreousBodyDTO {
    return this.model;
  }

  public setData(data: OphVitreousBodyDTO): void {
    this.model = data;
  }
}
