import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { DysraphicEarsDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-dysraphic-ears',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CheckFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './ears.component.html',
  styleUrls: ['./ears.component.scss']
})
export class DysraphicEarsComponent {
  @Input() public isExpanded = true;

  public model: DysraphicEarsDTO = {
    checked: false,
    largeProtruding: false,
    smallDeformed: false,
    differentSizes: false,
    differentlyPositioned: false,
    lowPositioned: false,
    comment: ''
  };

  public getData(): DysraphicEarsDTO {
    return this.model;
  }

  public setData(data: DysraphicEarsDTO): void {
    this.model = data;
  }
}
