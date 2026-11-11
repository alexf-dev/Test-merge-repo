import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { SpecialistDataComponent } from './components/specialist-data/specialist-data.component';
import { GeneralConditionComponent } from './components/general-condition/general-condition.component';
import { ConsciousnessComponent } from './components/consciousness/consciousness.component';
import { ReactionToSurroundingsComponent } from './components/reaction-to-surroundings/reaction-to-surroundings.component';
import { DysraphicStatusComponent } from './components/dysraphic-status/dysraphic-status.component';
import { CranialNervesComponent } from './components/cranial-nerves/cranial-nerves.component';
import { MotorSphereComponent } from './components/motor-sphere/motor-sphere.component';
import { TendonPeriostealReflexesComponent } from './components/tendon-periosteal-reflexes/tendon-periosteal-reflexes.component';
import { SkinReflexesComponent } from './components/skin-reflexes/skin-reflexes.component';
import { MucosalReflexesComponent } from './components/mucosal-reflexes/mucosal-reflexes.component';
import { PathologicalReflexesComponent } from './components/pathological-reflexes/pathological-reflexes.component';
import { PathologicalSynkinesiasComponent } from './components/pathological-synkinesias/pathological-synkinesias.component';
import { CoordinationComponent } from './components/coordination/coordination.component';
import { GaitComponent } from './components/gait/gait.component';
import { SpineComponent } from './components/spine/spine.component';
import { NerveRootTensionSymptomsComponent } from './components/nerve-root-tension-symptoms/nerve-root-tension-symptoms.component';
import { HyperkinesiasComponent } from './components/hyperkinesias/hyperkinesias.component';
import { SensoryDisordersComponent } from './components/sensory-disorders/sensory-disorders.component';
import { PelvicDisordersComponent } from './components/pelvic-disorders/pelvic-disorders.component';
import { VegetativeTrophicSphereComponent } from './components/vegetative-trophic-sphere/vegetative-trophic-sphere.component';
import { HigherCorticalFunctionsComponent } from './components/higher-cortical-functions/higher-cortical-functions.component';
import { NeurologicalStatusDTO, SkullDeformitiesDTO } from './models/neurological-status.models';

@Component({
  selector: 'app-neurological-status',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    CheckFieldComponent,
    CheckCommentFieldComponent,
    SpecialistDataComponent,
    GeneralConditionComponent,
    ConsciousnessComponent,
    ReactionToSurroundingsComponent,
    DysraphicStatusComponent,
    CranialNervesComponent,
    MotorSphereComponent,
    TendonPeriostealReflexesComponent,
    SkinReflexesComponent,
    MucosalReflexesComponent,
    PathologicalReflexesComponent,
    PathologicalSynkinesiasComponent,
    CoordinationComponent,
    GaitComponent,
    SpineComponent,
    NerveRootTensionSymptomsComponent,
    HyperkinesiasComponent,
    SensoryDisordersComponent,
    PelvicDisordersComponent,
    VegetativeTrophicSphereComponent,
    HigherCorticalFunctionsComponent
  ],
  templateUrl: './neurological-status.component.html',
  styleUrls: ['./neurological-status.component.scss']
})
export class NeurologicalStatusComponent {
  @ViewChild(SpecialistDataComponent) specialistDataComponent!: SpecialistDataComponent;
  @ViewChild(GeneralConditionComponent) generalConditionComponent!: GeneralConditionComponent;
  @ViewChild(ConsciousnessComponent) consciousnessComponent!: ConsciousnessComponent;
  @ViewChild(ReactionToSurroundingsComponent) reactionToSurroundingsComponent!: ReactionToSurroundingsComponent;
  @ViewChild(DysraphicStatusComponent) dysraphicStatusComponent!: DysraphicStatusComponent;
  @ViewChild(CranialNervesComponent) cranialNervesComponent!: CranialNervesComponent;
  @ViewChild(MotorSphereComponent) motorSphereComponent!: MotorSphereComponent;
  @ViewChild(TendonPeriostealReflexesComponent) tendonPeriostealReflexesComponent!: TendonPeriostealReflexesComponent;
  @ViewChild(SkinReflexesComponent) skinReflexesComponent!: SkinReflexesComponent;
  @ViewChild(MucosalReflexesComponent) mucosalReflexesComponent!: MucosalReflexesComponent;
  @ViewChild(PathologicalReflexesComponent) pathologicalReflexesComponent!: PathologicalReflexesComponent;
  @ViewChild(PathologicalSynkinesiasComponent) pathologicalSynkinesiasComponent!: PathologicalSynkinesiasComponent;
  @ViewChild(CoordinationComponent) coordinationComponent!: CoordinationComponent;
  @ViewChild(GaitComponent) gaitComponent!: GaitComponent;
  @ViewChild(SpineComponent) spineComponent!: SpineComponent;
  @ViewChild(NerveRootTensionSymptomsComponent) nerveRootTensionSymptomsComponent!: NerveRootTensionSymptomsComponent;
  @ViewChild(HyperkinesiasComponent) hyperkinesiasComponent!: HyperkinesiasComponent;
  @ViewChild(SensoryDisordersComponent) sensoryDisordersComponent!: SensoryDisordersComponent;
  @ViewChild(PelvicDisordersComponent) pelvicDisordersComponent!: PelvicDisordersComponent;
  @ViewChild(VegetativeTrophicSphereComponent) vegetativeTrophicSphereComponent!: VegetativeTrophicSphereComponent;
  @ViewChild(HigherCorticalFunctionsComponent) higherCorticalFunctionsComponent!: HigherCorticalFunctionsComponent;

  public noFocalPathology = false;

  public skullDeformities: SkullDeformitiesDTO = {
    checked: false,
    comment: ''
  };

  public getData(): NeurologicalStatusDTO {
    return {
      specialistData: this.specialistDataComponent.getData(),
      noFocalPathology: this.noFocalPathology,
      generalCondition: this.generalConditionComponent.getData(),
      consciousness: this.consciousnessComponent.getData(),
      reactionToSurroundings: this.reactionToSurroundingsComponent.getData(),
      skullDeformities: this.skullDeformities,
      dysraphicStatus: this.dysraphicStatusComponent.getData(),
      cranialNerves: this.cranialNervesComponent.getData(),
      motorSphere: this.motorSphereComponent.getData(),
      tendonPeriostealReflexes: this.tendonPeriostealReflexesComponent.getData(),
      skinReflexes: this.skinReflexesComponent.getData(),
      mucosalReflexes: this.mucosalReflexesComponent.getData(),
      pathologicalReflexes: this.pathologicalReflexesComponent.getData(),
      pathologicalSynkinesias: this.pathologicalSynkinesiasComponent.getData(),
      coordination: this.coordinationComponent.getData(),
      gait: this.gaitComponent.getData(),
      spine: this.spineComponent.getData(),
      nerveRootTensionSymptoms: this.nerveRootTensionSymptomsComponent.getData(),
      hyperkinesias: this.hyperkinesiasComponent.getData(),
      sensoryDisorders: this.sensoryDisordersComponent.getData(),
      pelvicDisorders: this.pelvicDisordersComponent.getData(),
      vegetativeTrophicSphere: this.vegetativeTrophicSphereComponent.getData(),
      higherCorticalFunctions: this.higherCorticalFunctionsComponent.getData()
    };
  }

  public setData(data: NeurologicalStatusDTO): void {
    this.specialistDataComponent.setData(data.specialistData);
    this.noFocalPathology = data.noFocalPathology;
    this.generalConditionComponent.setData(data.generalCondition);
    this.consciousnessComponent.setData(data.consciousness);
    this.reactionToSurroundingsComponent.setData(data.reactionToSurroundings);
    this.skullDeformities = data.skullDeformities;
    this.dysraphicStatusComponent.setData(data.dysraphicStatus);
    this.cranialNervesComponent.setData(data.cranialNerves);
    this.motorSphereComponent.setData(data.motorSphere);
    this.tendonPeriostealReflexesComponent.setData(data.tendonPeriostealReflexes);
    this.skinReflexesComponent.setData(data.skinReflexes);
    this.mucosalReflexesComponent.setData(data.mucosalReflexes);
    this.pathologicalReflexesComponent.setData(data.pathologicalReflexes);
    this.pathologicalSynkinesiasComponent.setData(data.pathologicalSynkinesias);
    this.coordinationComponent.setData(data.coordination);
    this.gaitComponent.setData(data.gait);
    this.spineComponent.setData(data.spine);
    this.nerveRootTensionSymptomsComponent.setData(data.nerveRootTensionSymptoms);
    this.hyperkinesiasComponent.setData(data.hyperkinesias);
    this.sensoryDisordersComponent.setData(data.sensoryDisorders);
    this.pelvicDisordersComponent.setData(data.pelvicDisorders);
    this.vegetativeTrophicSphereComponent.setData(data.vegetativeTrophicSphere);
    this.higherCorticalFunctionsComponent.setData(data.higherCorticalFunctions);
  }

  public onSave(): void {
    console.log('NeurologicalStatusDTO:', this.getData());
  }
}
