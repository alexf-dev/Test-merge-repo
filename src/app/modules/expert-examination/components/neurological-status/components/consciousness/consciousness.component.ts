import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { ConsciousnessDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-consciousness',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './consciousness.component.html',
  styleUrls: ['./consciousness.component.scss']
})
export class ConsciousnessComponent {
  @Input() public isExpanded = true;

  public model: ConsciousnessDTO = {
    clear: false,
    lightStupor: false,
    moderateStupor: false,
    pronouncedStupor: false,
    psychomotorAgitation: false,
    comment: ''
  };

  public getData(): ConsciousnessDTO {
    return this.model;
  }

  public setData(data: ConsciousnessDTO): void {
    this.model = data;
  }
}
