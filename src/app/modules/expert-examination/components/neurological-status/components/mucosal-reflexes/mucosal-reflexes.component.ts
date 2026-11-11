import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { MucosalReflexesDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-mucosal-reflexes',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './mucosal-reflexes.component.html',
  styleUrls: ['./mucosal-reflexes.component.scss']
})
export class MucosalReflexesComponent {
  @Input() public isExpanded = true;

  public model: MucosalReflexesDTO = {
    conjunctival: { checked: false, value: '' },
    corneal: { checked: false, value: '' },
    pharyngeal: { checked: false, value: '' },
    palatal: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): MucosalReflexesDTO {
    return this.model;
  }

  public setData(data: MucosalReflexesDTO): void {
    this.model = data;
  }
}
