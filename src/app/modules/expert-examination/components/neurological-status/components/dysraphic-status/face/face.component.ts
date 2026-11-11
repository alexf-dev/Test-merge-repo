import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { DysraphicFaceDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-dysraphic-face',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.scss']
})
export class DysraphicFaceComponent {
  @Input() public isExpanded = true;

  public model: DysraphicFaceDTO = {
    straightLineSlopingForehead: false,
    mongoloidEyeSlit: false,
    antiMongoloidEyeSlit: false,
    hypotelorism: false,
    saddleNose: false,
    facialAsymmetry: false,
    macrognathia: false,
    micrognathia: false,
    cleftChin: false,
    comment: ''
  };

  public getData(): DysraphicFaceDTO {
    return this.model;
  }

  public setData(data: DysraphicFaceDTO): void {
    this.model = data;
  }
}
