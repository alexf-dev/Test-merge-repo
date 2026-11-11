import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';

import { GastrointestinalTractDTO } from '../../models/surgical-status.models';

@Component({
  selector: 'app-gastrointestinal-tract',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CheckboxModule,
    CollapsibleBlockComponent,
    CheckCommentFieldComponent
  ],
  templateUrl: './gastrointestinal-tract.component.html',
  styleUrls: ['./gastrointestinal-tract.component.scss']
})
export class GastrointestinalTractComponent {
  @Input() public isExpanded = true;

  public model: GastrointestinalTractDTO = {
    tongueCleanMoist: false,
    tongueCoatedChecked: false,
    tongueCoated: '',
    abdomenSoft: false,
    abdomenDistended: false,
    postoperativeScarChecked: false,
    postoperativeScar: '',
    abdomenPainless: false,
    abdomenPainfulInChecked: false,
    abdomenPainfulIn: '',
    umbilicalHernia: false,
    inguinalHerniaChecked: false,
    inguinalHernia: '',
    femoralHerniaChecked: false,
    femoralHernia: '',
    lineaAlbaHerniaChecked: false,
    lineaAlbaHernia: '',
    rectusDiastasisChecked: false,
    rectusDiastasis: '',
    liverNotPalpable: false,
    liverProtrudesChecked: false,
    liverProtrudes: '',
    spleenNotPalpable: false,
    stoolNormal: false,
    stoolUnstable: false,
    spasticConstipation: false,
    atonicConstipation: false
  };

  public getData(): GastrointestinalTractDTO {
    return this.model;
  }

  public setData(data: GastrointestinalTractDTO): void {
    this.model = data;
  }
}
