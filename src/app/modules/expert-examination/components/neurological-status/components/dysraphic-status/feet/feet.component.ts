import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { DysraphicFeetDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-dysraphic-feet',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './feet.component.html',
  styleUrls: ['./feet.component.scss']
})
export class DysraphicFeetComponent {
  @Input() public isExpanded = true;

  public model: DysraphicFeetDTO = {
    brachydactyly: false,
    arachnodactyly: false,
    syndactyly: false,
    toeOverlapping: false,
    comment: ''
  };

  public getData(): DysraphicFeetDTO {
    return this.model;
  }

  public setData(data: DysraphicFeetDTO): void {
    this.model = data;
  }
}
