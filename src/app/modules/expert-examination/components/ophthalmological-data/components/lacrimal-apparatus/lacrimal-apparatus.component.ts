import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphLacrimalApparatusDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-lacrimal-apparatus',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    TextareaFieldComponent
  ],
  templateUrl: './lacrimal-apparatus.component.html',
  styleUrls: ['./lacrimal-apparatus.component.scss']
})
export class OphLacrimalApparatusComponent {
  @Input() public isExpanded = true;

  public model: OphLacrimalApparatusDTO = {
    value: ''
  };

  public getData(): OphLacrimalApparatusDTO {
    return this.model;
  }

  public setData(data: OphLacrimalApparatusDTO): void {
    this.model = data;
  }
}
