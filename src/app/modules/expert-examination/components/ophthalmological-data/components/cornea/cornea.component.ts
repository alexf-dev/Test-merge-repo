import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphCorneaDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-cornea',
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
  templateUrl: './cornea.component.html',
  styleUrls: ['./cornea.component.scss']
})
export class OphCorneaComponent {
  @Input() public isExpanded = true;

  public model: OphCorneaDTO = {
    transparent: { checked: false, value: '' },
    avascular: { checked: false, value: '' },
    cloudy: { checked: false, value: '' },
    edematous: { checked: false, value: '' },
    centralLeucoma: { checked: false, value: '' },
    peripheralLeucoma: { checked: false, value: '' },
    categoryI: false,
    categoryII: false,
    categoryIII: false,
    categoryIV: false,
    additionalInfo: ''
  };

  public getData(): OphCorneaDTO {
    return this.model;
  }

  public setData(data: OphCorneaDTO): void {
    this.model = data;
  }
}
