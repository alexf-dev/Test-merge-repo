import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphAnteriorChamberDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-anterior-chamber',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './anterior-chamber.component.html',
  styleUrls: ['./anterior-chamber.component.scss']
})
export class OphAnteriorChamberComponent {
  @Input() public isExpanded = true;

  public model: OphAnteriorChamberDTO = {
    irregular: { checked: false, value: '' },
    regular: { checked: false, value: '' },
    mediumDepth: { checked: false, value: '' },
    deep: { checked: false, value: '' },
    shallow: { checked: false, value: '' },
    absent: { checked: false, value: '' },
    contentsTransparent: { checked: false, value: '' },
    contentsCloudy: { checked: false, value: '' },
    hypopyon: { checked: false, value: '' },
    hyphema: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): OphAnteriorChamberDTO {
    return this.model;
  }

  public setData(data: OphAnteriorChamberDTO): void {
    this.model = data;
  }
}
