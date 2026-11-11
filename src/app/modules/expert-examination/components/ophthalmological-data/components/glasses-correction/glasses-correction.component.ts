import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { OphGlassesCorrectionDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-glasses-correction',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent
  ],
  templateUrl: './glasses-correction.component.html',
  styleUrls: ['./glasses-correction.component.scss']
})
export class OphGlassesCorrectionComponent {
  @Input() public isExpanded = true;

  public model: OphGlassesCorrectionDTO = {
    uses: false,
    doesNotUse: false
  };

  public getData(): OphGlassesCorrectionDTO {
    return this.model;
  }

  public setData(data: OphGlassesCorrectionDTO): void {
    this.model = data;
  }
}
