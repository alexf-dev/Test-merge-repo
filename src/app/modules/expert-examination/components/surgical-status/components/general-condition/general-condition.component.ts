import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';

import { GeneralConditionDTO } from '../../models/surgical-status.models';

@Component({
  selector: 'app-general-condition',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CheckboxModule,
    CollapsibleBlockComponent
  ],
  templateUrl: './general-condition.component.html',
  styleUrls: ['./general-condition.component.scss']
})
export class GeneralConditionComponent {
  @Input() public isExpanded = true;

  public model: GeneralConditionDTO = {
    satisfactory: false,
    relativelySatisfactory: false,
    moderate: false,
    severe: false,
    extremelySevere: false
  };

  public getData(): GeneralConditionDTO {
    return this.model;
  }

  public setData(data: GeneralConditionDTO): void {
    this.model = data;
  }
}
