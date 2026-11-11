import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphIrisDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-iris',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './iris.component.html',
  styleUrls: ['./iris.component.scss']
})
export class OphIrisComponent {
  @Input() public isExpanded = true;

  public model: OphIrisDTO = {
    color: { checked: false, value: '' },
    decolorized: { checked: false, value: '' },
    patternClear: { checked: false, value: '' },
    adhesionToCornea: { checked: false, value: '' },
    adhesionToLens: { checked: false, value: '' },
    dystrophic: { checked: false, value: '' },
    basalColoboma: { checked: false, value: '' },
    totalColoboma: { checked: false, value: '' },
    iridocele: { checked: false, value: '' },
    bombe: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): OphIrisDTO {
    return this.model;
  }

  public setData(data: OphIrisDTO): void {
    this.model = data;
  }
}
