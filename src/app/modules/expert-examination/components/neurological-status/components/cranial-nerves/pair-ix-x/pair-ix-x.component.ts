import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { CranialNervePairIXXDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-cranial-nerve-pair-ix-x',
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
  templateUrl: './pair-ix-x.component.html',
  styleUrls: ['./pair-ix-x.component.scss']
})
export class CranialNervePairIXXComponent {
  @Input() public isExpanded = true;

  public model: CranialNervePairIXXDTO = {
    softPalateDrooping: { checked: false, value: '' },
    uvulaDeviation: { checked: false, value: '' },
    dysphagia: false,
    dysphonia: false,
    dysarthria: false,
    vocalCordParesis: false,
    hyposalivation: false,
    tasteLossPosteriorOneThird: false,
    parasympatheticDenervation: false,
    additionalInfo: ''
  };

  public getData(): CranialNervePairIXXDTO {
    return this.model;
  }

  public setData(data: CranialNervePairIXXDTO): void {
    this.model = data;
  }
}
