import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphLensDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-lens',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './lens.component.html',
  styleUrls: ['./lens.component.scss']
})
export class OphLensComponent {
  @Input() public isExpanded = true;

  public model: OphLensDTO = {
    transparent: { checked: false, value: '' },
    subcapsularCloudy: { checked: false, value: '' },
    capsularCloudy: { checked: false, value: '' },
    absent: { checked: false, value: '' },
    intraocularLens: { checked: false, value: '' },
    surgeryContraindicated: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): OphLensDTO {
    return this.model;
  }

  public setData(data: OphLensDTO): void {
    this.model = data;
  }
}
