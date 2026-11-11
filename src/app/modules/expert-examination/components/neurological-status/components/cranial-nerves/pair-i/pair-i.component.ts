import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { CranialNervePairIDTO } from '../../../models/neurological-status.models';

@Component({
  selector: 'app-cranial-nerve-pair-i',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './pair-i.component.html',
  styleUrls: ['./pair-i.component.scss']
})
export class CranialNervePairIComponent {
  @Input() public isExpanded = true;

  public model: CranialNervePairIDTO = {
    anosmia: false,
    hyposmia: false,
    hyperosmia: false,
    dysosmia: false,
    olfactoryHallucinations: false,
    additionalInfo: ''
  };

  public getData(): CranialNervePairIDTO {
    return this.model;
  }

  public setData(data: CranialNervePairIDTO): void {
    this.model = data;
  }
}
