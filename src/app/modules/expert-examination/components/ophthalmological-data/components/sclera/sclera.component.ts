import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphScleraDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-sclera',
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
  templateUrl: './sclera.component.html',
  styleUrls: ['./sclera.component.scss']
})
export class OphScleraComponent {
  @Input() public isExpanded = true;

  public model: OphScleraDTO = {
    congestedInjection: { checked: false, value: '' },
    conjunctivalInjection: { checked: false, value: '' },
    mixedInjection: { checked: false, value: '' },
    mild: false,
    moderate: false,
    marked: false,
    additionalInfo: ''
  };

  public getData(): OphScleraDTO {
    return this.model;
  }

  public setData(data: OphScleraDTO): void {
    this.model = data;
  }
}
