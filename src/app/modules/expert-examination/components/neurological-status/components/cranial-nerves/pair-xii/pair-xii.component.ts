import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { CranialNervePairXIIDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-cranial-nerve-pair-xii',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './pair-xii.component.html',
  styleUrls: ['./pair-xii.component.scss']
})
export class CranialNervePairXIIComponent {
  @Input() public isExpanded = true;

  public model: CranialNervePairXIIDTO = {
    tongueMuscleAtrophy: false,
    tongueFibrillations: false,
    tongueDeviation: { checked: false, value: '' },
    dysarthria: false,
    tongueImmobility: false,
    anarthria: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): CranialNervePairXIIDTO {
    return this.model;
  }

  public setData(data: CranialNervePairXIIDTO): void {
    this.model = data;
  }
}
