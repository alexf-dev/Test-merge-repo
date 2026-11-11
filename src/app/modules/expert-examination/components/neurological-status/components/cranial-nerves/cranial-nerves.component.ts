import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CranialNervePairIComponent } from './pair-i/pair-i.component';
import { CranialNervePairIIComponent } from './pair-ii/pair-ii.component';
import { CranialNervePairIIIIVVIComponent } from './pair-iii-iv-vi/pair-iii-iv-vi.component';
import { CranialNervePairVComponent } from './pair-v/pair-v.component';
import { CranialNervePairVIIComponent } from './pair-vii/pair-vii.component';
import { CranialNervePairVIIIComponent } from './pair-viii/pair-viii.component';
import { CranialNervePairIXXComponent } from './pair-ix-x/pair-ix-x.component';
import { CranialNervePairXIComponent } from './pair-xi/pair-xi.component';
import { CranialNervePairXIIComponent } from './pair-xii/pair-xii.component';
import { CranialNervesDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-cranial-nerves',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    CranialNervePairIComponent,
    CranialNervePairIIComponent,
    CranialNervePairIIIIVVIComponent,
    CranialNervePairVComponent,
    CranialNervePairVIIComponent,
    CranialNervePairVIIIComponent,
    CranialNervePairIXXComponent,
    CranialNervePairXIComponent,
    CranialNervePairXIIComponent
  ],
  templateUrl: './cranial-nerves.component.html',
  styleUrls: ['./cranial-nerves.component.scss']
})
export class CranialNervesComponent {
  @Input() public isExpanded = true;

  @ViewChild(CranialNervePairIComponent) pairIComponent!: CranialNervePairIComponent;
  @ViewChild(CranialNervePairIIComponent) pairIIComponent!: CranialNervePairIIComponent;
  @ViewChild(CranialNervePairIIIIVVIComponent) pairIIIIVVIComponent!: CranialNervePairIIIIVVIComponent;
  @ViewChild(CranialNervePairVComponent) pairVComponent!: CranialNervePairVComponent;
  @ViewChild(CranialNervePairVIIComponent) pairVIIComponent!: CranialNervePairVIIComponent;
  @ViewChild(CranialNervePairVIIIComponent) pairVIIIComponent!: CranialNervePairVIIIComponent;
  @ViewChild(CranialNervePairIXXComponent) pairIXXComponent!: CranialNervePairIXXComponent;
  @ViewChild(CranialNervePairXIComponent) pairXIComponent!: CranialNervePairXIComponent;
  @ViewChild(CranialNervePairXIIComponent) pairXIIComponent!: CranialNervePairXIIComponent;

  public noPathology = false;

  public getData(): CranialNervesDTO {
    return {
      noPathology: this.noPathology,
      pairI: this.pairIComponent.getData(),
      pairII: this.pairIIComponent.getData(),
      pairIIIIVVI: this.pairIIIIVVIComponent.getData(),
      pairV: this.pairVComponent.getData(),
      pairVII: this.pairVIIComponent.getData(),
      pairVIII: this.pairVIIIComponent.getData(),
      pairIXX: this.pairIXXComponent.getData(),
      pairXI: this.pairXIComponent.getData(),
      pairXII: this.pairXIIComponent.getData()
    };
  }

  public setData(data: CranialNervesDTO): void {
    this.noPathology = data.noPathology;
    this.pairIComponent.setData(data.pairI);
    this.pairIIComponent.setData(data.pairII);
    this.pairIIIIVVIComponent.setData(data.pairIIIIVVI);
    this.pairVComponent.setData(data.pairV);
    this.pairVIIComponent.setData(data.pairVII);
    this.pairVIIIComponent.setData(data.pairVIII);
    this.pairIXXComponent.setData(data.pairIXX);
    this.pairXIComponent.setData(data.pairXI);
    this.pairXIIComponent.setData(data.pairXII);
  }
}
