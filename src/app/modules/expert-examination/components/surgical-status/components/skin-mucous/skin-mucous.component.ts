import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';

import { SkinMucousDTO } from '../../models/surgical-status.models';

@Component({
  selector: 'app-skin-mucous',
  standalone: true,
  imports: [CommonModule, TranslateModule, CollapsibleBlockComponent, CheckCommentFieldComponent],
  templateUrl: './skin-mucous.component.html',
  styleUrls: ['./skin-mucous.component.scss']
})
export class SkinMucousComponent {
  @Input() public isExpanded = true;
  public checked = false;

  public model: SkinMucousDTO = {
    normal: false,
    normalComment: ''
  };

  public getData(): SkinMucousDTO {
    return this.model;
  }

  public setData(data: SkinMucousDTO): void {
    this.model = data;
  }
}
