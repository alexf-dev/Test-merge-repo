import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { CardiovascularSystemDTO } from '../../models/surgical-status.models';

@Component({
  selector: 'app-cardiovascular-system',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CheckboxModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './cardiovascular-system.component.html',
  styleUrls: ['./cardiovascular-system.component.scss']
})
export class CardiovascularSystemComponent {
  @Input() public isExpanded = true;

  public model: CardiovascularSystemDTO = {
    heartSoundsChecked: false,
    heartSounds: '',
    bloodPressureChecked: false,
    bloodPressure: '',
    rhythmicPulse: false,
    pulseRateChecked: false,
    pulseRate: '',
    additionalInfo: ''
  };

  public getData(): CardiovascularSystemDTO {
    return this.model;
  }

  public setData(data: CardiovascularSystemDTO): void {
    this.model = data;
  }
}
