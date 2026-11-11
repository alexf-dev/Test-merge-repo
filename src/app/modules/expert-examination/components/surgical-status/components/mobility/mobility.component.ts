import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { MobilityDTO } from '../../models/surgical-status.models';

@Component({
  selector: 'app-mobility',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, CheckboxModule, CollapsibleBlockComponent, TextareaFieldComponent],
  templateUrl: './mobility.component.html',
  styleUrls: ['./mobility.component.scss']
})
export class MobilityComponent {
  @Input() public isExpanded = true;

  public model: MobilityDTO = {
    independent: false,
    withCane: false,
    withCrutches: false,
    wheelchair: false,
    supportOnInjuredLimb: false,
    comment: ''
  };

  public getData(): MobilityDTO {
    return this.model;
  }

  public setData(data: MobilityDTO): void {
    this.model = data;
  }
}
