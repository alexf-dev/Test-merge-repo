import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { CranialNervePairVIIIDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-cranial-nerve-pair-viii',
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
  templateUrl: './pair-viii.component.html',
  styleUrls: ['./pair-viii.component.scss']
})
export class CranialNervePairVIIIComponent {
  @Input() public isExpanded = true;

  public model: CranialNervePairVIIIDTO = {
    hearingAcuityD: { checked: false, value: '' },
    hearingAcuityS: { checked: false, value: '' },
    deafness: false,
    tinnitus: false,
    systemicVertigo: false,
    nonSystemicVertigo: false,
    nystagmus: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): CranialNervePairVIIIDTO {
    return this.model;
  }

  public setData(data: CranialNervePairVIIIDTO): void {
    this.model = data;
  }
}
