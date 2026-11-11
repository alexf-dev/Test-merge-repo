import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { PsychomotorDevelopmentDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-psychomotor-development',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './psychomotor-development.component.html',
  styleUrls: ['./psychomotor-development.component.scss']
})
export class PsychomotorDevelopmentComponent {
  @Input() public isExpanded = true;

  public model: PsychomotorDevelopmentDTO = {
    respondsToAuditoryStimuli: { checked: false, value: '' },
    respondsToVisualStimuli: { checked: false, value: '' },
    holdsHead: { checked: false, value: '' },
    sitsWithSupport: { checked: false, value: '' },
    sitsStably: { checked: false, value: '' },
    crawls: { checked: false, value: '' },
    getsOnAllFours: { checked: false, value: '' },
    stands: { checked: false, value: '' },
    walksIndependently: { checked: false, value: '' },
    walksWithSupport: { checked: false, value: '' },
    coos: { checked: false, value: '' },
    babbles: { checked: false, value: '' },
    makesSounds: { checked: false, value: '' },
    understandsAddressedSpeech: { checked: false, value: '' },
    playsWithToys: { checked: false, value: '' },
    eatsDrinksIndependently: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): PsychomotorDevelopmentDTO {
    return this.model;
  }

  public setData(data: PsychomotorDevelopmentDTO): void {
    this.model = data;
  }
}
