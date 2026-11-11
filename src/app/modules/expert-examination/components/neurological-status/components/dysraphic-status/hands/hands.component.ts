import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { DysraphicHandsDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-dysraphic-hands',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './hands.component.html',
  styleUrls: ['./hands.component.scss']
})
export class DysraphicHandsComponent {
  @Input() public isExpanded = true;

  public model: DysraphicHandsDTO = {
    brachydactyly: false,
    arachnodactyly: false,
    syndactyly: false,
    transversePalmarCrease: false,
    fingerCurvature: false,
    comment: ''
  };

  public getData(): DysraphicHandsDTO {
    return this.model;
  }

  public setData(data: DysraphicHandsDTO): void {
    this.model = data;
  }
}
