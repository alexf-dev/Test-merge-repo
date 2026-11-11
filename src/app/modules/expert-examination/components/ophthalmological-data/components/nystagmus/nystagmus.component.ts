import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphNystagmusDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-nystagmus',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './nystagmus.component.html',
  styleUrls: ['./nystagmus.component.scss']
})
export class OphNystagmusComponent {
  @Input() public isExpanded = true;

  public model: OphNystagmusDTO = {
    pendular: { checked: false, value: '' },
    jerky: { checked: false, value: '' },
    horizontal: { checked: false, value: '' },
    vertical: { checked: false, value: '' },
    rotatory: { checked: false, value: '' },
    circumferential: { checked: false, value: '' },
    positional: { checked: false, value: '' },
    macroAmplitude: { checked: false, value: '' },
    mesoAmplitude: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): OphNystagmusDTO {
    return this.model;
  }

  public setData(data: OphNystagmusDTO): void {
    this.model = data;
  }
}
