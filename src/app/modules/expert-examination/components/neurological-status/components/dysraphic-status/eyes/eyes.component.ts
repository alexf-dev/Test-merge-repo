import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { DysraphicEyesDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-dysraphic-eyes',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './eyes.component.html',
  styleUrls: ['./eyes.component.scss']
})
export class DysraphicEyesComponent {
  @Input() public isExpanded = true;

  public model: DysraphicEyesDTO = {
    epicanthus: false,
    asymmetricEyeSlits: false,
    comment: ''
  };

  public getData(): DysraphicEyesDTO {
    return this.model;
  }

  public setData(data: DysraphicEyesDTO): void {
    this.model = data;
  }
}
