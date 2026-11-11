import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { TextInputFieldComponent } from '@shared/text-input-field/text-input-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';

import { SpecialistDataDTO } from '../../models/surgical-status.models';

@Component({
  selector: 'app-specialist-data',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CollapsibleBlockComponent,
    TextInputFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './specialist-data.component.html',
  styleUrls: ['./specialist-data.component.scss']
})
export class SpecialistDataComponent {
  @Input() public isExpanded = true;

  public model: SpecialistDataDTO = {
    specialist: '',
    conclusion: ''
  };

  public getData(): SpecialistDataDTO {
    return this.model;
  }

  public setData(data: SpecialistDataDTO): void {
    this.model = data;
  }
}
