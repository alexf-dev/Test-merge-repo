import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';

import { MuscularSystemDTO } from '../../models/surgical-status.models';

@Component({
  selector: 'app-muscular-system',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CheckboxModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent
  ],
  templateUrl: './muscular-system.component.html',
  styleUrls: ['./muscular-system.component.scss']
})
export class MuscularSystemComponent {
  @Input() public isExpanded = true;

  public model: MuscularSystemDTO = {
    development: {
      weaklyDeveloped: false,
      satisfactorilyDeveloped: false,
      wellDeveloped: false
    },
    tone: {
      atrophyChecked: false,
      atrophy: '',
      hypertrophyChecked: false,
      hypertrophy: '',
      hypotoniaChecked: false,
      hypotonia: '',
      hypertoniaChecked: false,
      hypertonia: '',
      myotoniaChecked: false,
      myotonia: ''
    }
  };

  public getData(): MuscularSystemDTO {
    return this.model;
  }

  public setData(data: MuscularSystemDTO): void {
    this.model = data;
  }
}
