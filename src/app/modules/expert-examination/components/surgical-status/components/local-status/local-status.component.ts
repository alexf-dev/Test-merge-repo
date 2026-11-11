import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { LocalStatusDTO } from '../../models/surgical-status.models';

@Component({
  selector: 'app-local-status',
  standalone: true,
  imports: [CommonModule, TranslateModule, CollapsibleBlockComponent, TextareaFieldComponent],
  templateUrl: './local-status.component.html',
  styleUrls: ['./local-status.component.scss']
})
export class LocalStatusComponent {
  @Input() public isExpanded = true;

  public model: LocalStatusDTO = {
    description: ''
  };

  public getData(): LocalStatusDTO {
    return this.model;
  }

  public setData(data: LocalStatusDTO): void {
    this.model = data;
  }
}
