import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { HyperkinesiasDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-hyperkinesias',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './hyperkinesias.component.html',
  styleUrls: ['./hyperkinesias.component.scss']
})
export class HyperkinesiasComponent {
  @Input() public isExpanded = true;

  public model: HyperkinesiasDTO = {
    athetosis: false,
    choreicConvulsions: false,
    tics: false,
    myoclonia: false,
    hemiballismus: false,
    tremor: false,
    torsionSpasm: false,
    blepharospasm: false,
    facialHemispasm: false,
    additionalInfo: ''
  };

  public getData(): HyperkinesiasDTO {
    return this.model;
  }

  public setData(data: HyperkinesiasDTO): void {
    this.model = data;
  }
}
