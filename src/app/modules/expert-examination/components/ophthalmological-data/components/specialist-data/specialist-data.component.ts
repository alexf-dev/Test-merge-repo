import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { TextInputFieldComponent } from '@shared/text-input-field/text-input-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { OphSpecialistDataDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-specialist-data',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    TextInputFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './specialist-data.component.html',
  styleUrls: ['./specialist-data.component.scss']
})
export class OphSpecialistDataComponent {
  public model: OphSpecialistDataDTO = {
    specialist: '',
    specialistComment: ''
  };

  public getData(): OphSpecialistDataDTO {
    return this.model;
  }

  public setData(data: OphSpecialistDataDTO): void {
    this.model = data;
  }
}
