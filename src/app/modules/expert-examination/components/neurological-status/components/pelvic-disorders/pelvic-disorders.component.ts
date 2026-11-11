import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { PelvicDisordersDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-pelvic-disorders',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    CheckCommentFieldComponent
  ],
  templateUrl: './pelvic-disorders.component.html',
  styleUrls: ['./pelvic-disorders.component.scss']
})
export class PelvicDisordersComponent {
  @Input() public isExpanded = true;

  public model: PelvicDisordersDTO = {
    urinaryIncontinence: { checked: false, value: '' },
    fecalIncontinence: { checked: false, value: '' },
    urinaryRetention: { checked: false, value: '' },
    fecalRetention: { checked: false, value: '' },
    imperativeUrge: false,
    noUrge: false,
    impotence: false,
    infertility: false
  };

  public getData(): PelvicDisordersDTO {
    return this.model;
  }

  public setData(data: PelvicDisordersDTO): void {
    this.model = data;
  }
}
