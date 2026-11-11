import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { SensoryDisordersDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-sensory-disorders',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './sensory-disorders.component.html',
  styleUrls: ['./sensory-disorders.component.scss']
})
export class SensoryDisordersComponent {
  @Input() public isExpanded = true;

  public model: SensoryDisordersDTO = {
    peripheralType: false,
    segmentalType: false,
    conductorType: false,
    corticalType: false,
    dissociatedSensoryDisorders: false,
    additionalInfo: ''
  };

  public getData(): SensoryDisordersDTO {
    return this.model;
  }

  public setData(data: SensoryDisordersDTO): void {
    this.model = data;
  }
}
