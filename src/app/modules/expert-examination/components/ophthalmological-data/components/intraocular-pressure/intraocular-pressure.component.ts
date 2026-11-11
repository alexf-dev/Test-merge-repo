import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { OphIntraocularPressureDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-intraocular-pressure',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent
  ],
  templateUrl: './intraocular-pressure.component.html',
  styleUrls: ['./intraocular-pressure.component.scss']
})
export class OphIntraocularPressureComponent {
  @Input() public isExpanded = true;

  public model: OphIntraocularPressureDTO = {
    od: { checked: false, value: '' },
    os: { checked: false, value: '' }
  };

  public getData(): OphIntraocularPressureDTO {
    return this.model;
  }

  public setData(data: OphIntraocularPressureDTO): void {
    this.model = data;
  }
}
