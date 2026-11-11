import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

import { SpecialistDataComponent } from './components/specialist-data/specialist-data.component';
import { SurgicalPathologyDataComponent } from './components/surgical-pathology-data/surgical-pathology-data.component';
import { GeneralConditionComponent } from './components/general-condition/general-condition.component';
import { MobilityComponent } from './components/mobility/mobility.component';
import { SkinMucousComponent } from './components/skin-mucous/skin-mucous.component';
import { MuscularSystemComponent } from './components/muscular-system/muscular-system.component';
import { BoneSystemComponent } from './components/bone-system/bone-system.component';
import { JointsComponent } from './components/joints/joints.component';
import { LymphNodesComponent } from './components/lymph-nodes/lymph-nodes.component';
import { RespiratorySystemComponent } from './components/respiratory-system/respiratory-system.component';
import { CardiovascularSystemComponent } from './components/cardiovascular-system/cardiovascular-system.component';
import { GastrointestinalTractComponent } from './components/gastrointestinal-tract/gastrointestinal-tract.component';
import { UrogenitalSystemComponent } from './components/urogenital-system/urogenital-system.component';
import { LocalStatusComponent } from './components/local-status/local-status.component';
import { OrganFunctionImpairmentComponent } from './components/organ-function-impairment/organ-function-impairment.component';

import { SurgicalStatusDTO } from './models/surgical-status.models';

@Component({
  selector: 'app-surgical-status',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    SpecialistDataComponent,
    SurgicalPathologyDataComponent,
    GeneralConditionComponent,
    MobilityComponent,
    SkinMucousComponent,
    MuscularSystemComponent,
    BoneSystemComponent,
    JointsComponent,
    LymphNodesComponent,
    RespiratorySystemComponent,
    CardiovascularSystemComponent,
    GastrointestinalTractComponent,
    UrogenitalSystemComponent,
    LocalStatusComponent,
    OrganFunctionImpairmentComponent
  ],
  templateUrl: './surgical-status.component.html',
  styleUrls: ['./surgical-status.component.scss']
})
export class SurgicalStatusComponent {
  @ViewChild(SpecialistDataComponent) specialistDataComponent!: SpecialistDataComponent;
  @ViewChild(SurgicalPathologyDataComponent) surgicalPathologyDataComponent!: SurgicalPathologyDataComponent;
  @ViewChild(GeneralConditionComponent) generalConditionComponent!: GeneralConditionComponent;
  @ViewChild(MobilityComponent) mobilityComponent!: MobilityComponent;
  @ViewChild(SkinMucousComponent) skinMucousComponent!: SkinMucousComponent;
  @ViewChild(MuscularSystemComponent) muscularSystemComponent!: MuscularSystemComponent;
  @ViewChild(BoneSystemComponent) boneSystemComponent!: BoneSystemComponent;
  @ViewChild(JointsComponent) jointsComponent!: JointsComponent;
  @ViewChild(LymphNodesComponent) lymphNodesComponent!: LymphNodesComponent;
  @ViewChild(RespiratorySystemComponent) respiratorySystemComponent!: RespiratorySystemComponent;
  @ViewChild(CardiovascularSystemComponent) cardiovascularSystemComponent!: CardiovascularSystemComponent;
  @ViewChild(GastrointestinalTractComponent) gastrointestinalTractComponent!: GastrointestinalTractComponent;
  @ViewChild(UrogenitalSystemComponent) urogenitalSystemComponent!: UrogenitalSystemComponent;
  @ViewChild(LocalStatusComponent) localStatusComponent!: LocalStatusComponent;
  @ViewChild(OrganFunctionImpairmentComponent) organFunctionImpairmentComponent!: OrganFunctionImpairmentComponent;

  public getData(): SurgicalStatusDTO {
    return {
      specialistData: this.specialistDataComponent.getData(),
      surgicalPathologyData: this.surgicalPathologyDataComponent.getData(),
      generalCondition: this.generalConditionComponent.getData(),
      mobility: this.mobilityComponent.getData(),
      skinMucous: this.skinMucousComponent.getData(),
      muscularSystem: this.muscularSystemComponent.getData(),
      boneSystem: this.boneSystemComponent.getData(),
      joints: this.jointsComponent.getData(),
      lymphNodes: this.lymphNodesComponent.getData(),
      respiratorySystem: this.respiratorySystemComponent.getData(),
      cardiovascularSystem: this.cardiovascularSystemComponent.getData(),
      gastrointestinalTract: this.gastrointestinalTractComponent.getData(),
      urogenitalSystem: this.urogenitalSystemComponent.getData(),
      localStatus: this.localStatusComponent.getData(),
      organFunctionImpairment: this.organFunctionImpairmentComponent.getData()
    };
  }

  public setData(data: SurgicalStatusDTO): void {
    this.specialistDataComponent.setData(data.specialistData);
    this.surgicalPathologyDataComponent.setData(data.surgicalPathologyData);
    this.generalConditionComponent.setData(data.generalCondition);
    this.mobilityComponent.setData(data.mobility);
    this.skinMucousComponent.setData(data.skinMucous);
    this.muscularSystemComponent.setData(data.muscularSystem);
    this.boneSystemComponent.setData(data.boneSystem);
    this.jointsComponent.setData(data.joints);
    this.lymphNodesComponent.setData(data.lymphNodes);
    this.respiratorySystemComponent.setData(data.respiratorySystem);
    this.cardiovascularSystemComponent.setData(data.cardiovascularSystem);
    this.gastrointestinalTractComponent.setData(data.gastrointestinalTract);
    this.urogenitalSystemComponent.setData(data.urogenitalSystem);
    this.localStatusComponent.setData(data.localStatus);
    this.organFunctionImpairmentComponent.setData(data.organFunctionImpairment);
  }

  public onSave(): void {
    console.log('SurgicalStatusDTO:', this.getData());
  }
}
