import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { ReactionToSurroundingsDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-reaction-to-surroundings',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './reaction-to-surroundings.component.html',
  styleUrls: ['./reaction-to-surroundings.component.scss']
})
export class ReactionToSurroundingsComponent {
  @Input() public isExpanded = true;

  public model: ReactionToSurroundingsDTO = {
    adequate: false,
    inadequate: false,
    comment: ''
  };

  public getData(): ReactionToSurroundingsDTO {
    return this.model;
  }

  public setData(data: ReactionToSurroundingsDTO): void {
    this.model = data;
  }
}
