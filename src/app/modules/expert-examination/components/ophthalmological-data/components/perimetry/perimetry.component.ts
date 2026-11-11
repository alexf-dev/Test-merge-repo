import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphPerimetryDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-perimetry',
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
  templateUrl: './perimetry.component.html',
  styleUrls: ['./perimetry.component.scss']
})
export class OphPerimetryComponent {
  @Input() public isExpanded = true;

  public model: OphPerimetryDTO = {
    noPathology: false,
    heteronymousBinasalHemianopia: { checked: false, value: '' },
    heteronymousBitemporalHemianopia: { checked: false, value: '' },
    quadrantHemianopia: { checked: false, value: '' },
    homonymousHemianopia: { checked: false, value: '' },
    concentricVisualFieldConstriction: { checked: false, value: '' },
    centralScotomas: { checked: false, value: '' },
    paracentralScotomas: { checked: false, value: '' },
    peripheralScotomas: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): OphPerimetryDTO {
    return this.model;
  }

  public setData(data: OphPerimetryDTO): void {
    this.model = data;
  }
}
