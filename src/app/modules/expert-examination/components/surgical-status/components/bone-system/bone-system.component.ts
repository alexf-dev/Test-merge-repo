import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';

import { BoneSystemDTO } from '../../models/surgical-status.models';

@Component({
  selector: 'app-bone-system',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, CheckboxModule, CollapsibleBlockComponent, CheckCommentFieldComponent],
  templateUrl: './bone-system.component.html',
  styleUrls: ['./bone-system.component.scss']
})
export class BoneSystemComponent {
  @Input() public isExpanded = true;

  public model: BoneSystemDTO = {
    deformationChecked: false,
    deformation: '',
    noDeformation: false
  };

  public getData(): BoneSystemDTO {
    return this.model;
  }

  public setData(data: BoneSystemDTO): void {
    this.model = data;
  }
}
