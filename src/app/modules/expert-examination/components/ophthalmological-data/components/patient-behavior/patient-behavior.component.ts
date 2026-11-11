import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { OphPatientBehaviorDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-patient-behavior',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent
  ],
  templateUrl: './patient-behavior.component.html',
  styleUrls: ['./patient-behavior.component.scss']
})
export class OphPatientBehaviorComponent {
  @Input() public isExpanded = true;

  public model: OphPatientBehaviorDTO = {
    orientatesFreely: false,
    doesNotOrientate: false,
    walksWithHelp: false,
    walksWithCane: false,
    walksIndependently: false,
    overcomesObstaclesFreely: false,
    overcomesObstaclesWithDifficulty: false,
    findsDoorHandleChair: false,
    dressesIndependently: false,
    dressesWithHelp: false,
    followsHandMovement: false
  };

  public getData(): OphPatientBehaviorDTO {
    return this.model;
  }

  public setData(data: OphPatientBehaviorDTO): void {
    this.model = data;
  }
}
