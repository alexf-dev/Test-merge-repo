import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { PathologicalSynkinesiasDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-pathological-synkinesias',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './pathological-synkinesias.component.html',
  styleUrls: ['./pathological-synkinesias.component.scss']
})
export class PathologicalSynkinesiasComponent {
  @Input() public isExpanded = true;

  public model: PathologicalSynkinesiasDTO = {
    strumpellTibialPhenomenon: { checked: false, value: '' },
    pronatorSynkinesis: { checked: false, value: '' },
    radialSynkinesis: { checked: false, value: '' },
    raimistSynkinesis: { checked: false, value: '' },
    additionalInfo: ''
  };

  public getData(): PathologicalSynkinesiasDTO {
    return this.model;
  }

  public setData(data: PathologicalSynkinesiasDTO): void {
    this.model = data;
  }
}
