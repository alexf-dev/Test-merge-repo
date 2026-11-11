import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { DysraphicSkullComponent } from './skull/skull.component';
import { DysraphicFaceComponent } from './face/face.component';
import { DysraphicEyesComponent } from './eyes/eyes.component';
import { DysraphicEarsComponent } from './ears/ears.component';
import { DysraphicNeckComponent } from './neck/neck.component';
import { DysraphicHandsComponent } from './hands/hands.component';
import { DysraphicFeetComponent } from './feet/feet.component';
import { DysraphicStatusDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-dysraphic-status',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    TextareaFieldComponent,
    DysraphicSkullComponent,
    DysraphicFaceComponent,
    DysraphicEyesComponent,
    DysraphicEarsComponent,
    DysraphicNeckComponent,
    DysraphicHandsComponent,
    DysraphicFeetComponent
  ],
  templateUrl: './dysraphic-status.component.html',
  styleUrls: ['./dysraphic-status.component.scss']
})
export class DysraphicStatusComponent {
  @Input() public isExpanded = true;

  @ViewChild(DysraphicSkullComponent) skullComponent!: DysraphicSkullComponent;
  @ViewChild(DysraphicFaceComponent) faceComponent!: DysraphicFaceComponent;
  @ViewChild(DysraphicEyesComponent) eyesComponent!: DysraphicEyesComponent;
  @ViewChild(DysraphicEarsComponent) earsComponent!: DysraphicEarsComponent;
  @ViewChild(DysraphicNeckComponent) neckComponent!: DysraphicNeckComponent;
  @ViewChild(DysraphicHandsComponent) handsComponent!: DysraphicHandsComponent;
  @ViewChild(DysraphicFeetComponent) feetComponent!: DysraphicFeetComponent;

  public additionalInfo = '';

  public getData(): DysraphicStatusDTO {
    return {
      skull: this.skullComponent.getData(),
      face: this.faceComponent.getData(),
      eyes: this.eyesComponent.getData(),
      ears: this.earsComponent.getData(),
      neck: this.neckComponent.getData(),
      hands: this.handsComponent.getData(),
      feet: this.feetComponent.getData(),
      additionalInfo: this.additionalInfo
    };
  }

  public setData(data: DysraphicStatusDTO): void {
    this.skullComponent.setData(data.skull);
    this.faceComponent.setData(data.face);
    this.eyesComponent.setData(data.eyes);
    this.earsComponent.setData(data.ears);
    this.neckComponent.setData(data.neck);
    this.handsComponent.setData(data.hands);
    this.feetComponent.setData(data.feet);
    this.additionalInfo = data.additionalInfo ?? '';
  }
}
