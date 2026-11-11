import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { DysraphicNeckDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-dysraphic-neck',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './neck.component.html',
  styleUrls: ['./neck.component.scss']
})
export class DysraphicNeckComponent {
  @Input() public isExpanded = true;

  public model: DysraphicNeckDTO = {
    short: false,
    long: false,
    torticollis: false,
    pterygoidFolds: false,
    excessiveFolds: false,
    comment: ''
  };

  public getData(): DysraphicNeckDTO {
    return this.model;
  }

  public setData(data: DysraphicNeckDTO): void {
    this.model = data;
  }
}
