import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { DysraphicSkullDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-dysraphic-skull',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './skull.component.html',
  styleUrls: ['./skull.component.scss']
})
export class DysraphicSkullComponent {
  @Input() public isExpanded = true;

  public model: DysraphicSkullDTO = {
    microcephalic: false,
    hydrocephalic: false,
    brachycephalic: false,
    dolichocephalic: false,
    asymmetric: false,
    comment: ''
  };

  public getData(): DysraphicSkullDTO {
    return this.model;
  }

  public setData(data: DysraphicSkullDTO): void {
    this.model = data;
  }
}
