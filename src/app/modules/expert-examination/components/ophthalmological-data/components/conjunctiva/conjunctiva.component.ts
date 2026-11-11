import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphConjunctivaDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-conjunctiva',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './conjunctiva.component.html',
  styleUrls: ['./conjunctiva.component.scss']
})
export class OphConjunctivaComponent {
  @Input() public isExpanded = true;

  public model: OphConjunctivaDTO = {
    palePink: { checked: false, value: '' },
    pink: { checked: false, value: '' },
    glossy: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): OphConjunctivaDTO {
    return this.model;
  }

  public setData(data: OphConjunctivaDTO): void {
    this.model = data;
  }
}
