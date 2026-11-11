import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { TextInputFieldComponent } from '@shared/text-input-field/text-input-field.component';

import { OrganFunctionImpairmentDTO } from '../../models/surgical-status.models';

@Component({
  selector: 'app-organ-function-impairment',
  standalone: true,
  imports: [CommonModule, TranslateModule, CollapsibleBlockComponent, TextInputFieldComponent],
  templateUrl: './organ-function-impairment.component.html',
  styleUrls: ['./organ-function-impairment.component.scss']
})
export class OrganFunctionImpairmentComponent {
  @Input() public isExpanded = true;

  public model: OrganFunctionImpairmentDTO = {
    organSize: '',
    spread: '',
    boundaries: '',
    immobilization: '',
    fixationDevice: '',
    pathologicalMobility: '',
    deformation: '',
    hypotrophy: '',
    atrophy: '',
    woundSize: '',
    fistulaSize: '',
    woundDischarge: '',
    peripheralVesselPulsation: '',
    trophicChanges: ''
  };

  public getData(): OrganFunctionImpairmentDTO {
    return this.model;
  }

  public setData(data: OrganFunctionImpairmentDTO): void {
    this.model = data;
  }
}
