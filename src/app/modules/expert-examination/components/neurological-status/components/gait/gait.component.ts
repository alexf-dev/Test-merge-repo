import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { GaitDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-gait',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './gait.component.html',
  styleUrls: ['./gait.component.scss']
})
export class GaitComponent {
  @Input() public isExpanded = true;

  public model: GaitDTO = {
    sparing: false,
    paretic: false,
    steppage: false,
    hemiparetic: false,
    spasticParetic: false,
    atactic: false,
    duck: false,
    slowSmallSteps: false,
    additionalInfo: ''
  };

  public getData(): GaitDTO {
    return this.model;
  }

  public setData(data: GaitDTO): void {
    this.model = data;
  }
}
