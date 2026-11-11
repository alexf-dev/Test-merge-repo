import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';

import { SurgicalPathologyDataDTO } from '../../models/surgical-status.models';

@Component({
  selector: 'app-surgical-pathology-data',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, CheckboxModule, CollapsibleBlockComponent],
  templateUrl: './surgical-pathology-data.component.html',
  styleUrls: ['./surgical-pathology-data.component.scss']
})
export class SurgicalPathologyDataComponent {
  @Input() public isExpanded = true;

  public model: SurgicalPathologyDataDTO = {
    hasSurgicalPathology: false
  };

  public getData(): SurgicalPathologyDataDTO {
    return this.model;
  }

  public setData(data: SurgicalPathologyDataDTO): void {
    this.model = data;
  }
}
