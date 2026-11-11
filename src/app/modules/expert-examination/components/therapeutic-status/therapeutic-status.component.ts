import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

import { SpecialistDataComponent } from './components/specialist-data/specialist-data.component';
import { PatientConditionComponent } from './components/patient-condition/patient-condition.component';
import { SkinAndMucousComponent } from './components/skin-and-mucous/skin-and-mucous.component';
import { PharynxComponent } from './components/pharynx/pharynx.component';
import { HairNailsComponent } from './components/hair-nails/hair-nails.component';
import { SubcutaneousFatComponent } from './components/subcutaneous-fat/subcutaneous-fat.component';
import { LymphNodesComponent } from './components/lymph-nodes/lymph-nodes.component';
import { MusculoskeletalComponent } from './components/musculoskeletal/musculoskeletal.component';
import { MuscularSystemComponent } from './components/muscular-system/muscular-system.component';
import { BoneMuscleSystemComponent } from './components/bone-muscle-system/bone-muscle-system.component';
import { ThyroidGlandComponent } from './components/thyroid-gland/thyroid-gland.component';
import { RespiratorySystemComponent } from './components/respiratory-system/respiratory-system.component';
import { CardiovascularSystemComponent } from './components/cardiovascular-system/cardiovascular-system.component';
import { DigestiveSystemComponent } from './components/digestive-system/digestive-system.component';
import { UrinarySystemComponent } from './components/urinary-system/urinary-system.component';

import { isBlockExpandedByConfig } from '../../expert-examination.config';

@Component({
  selector: 'app-therapeutic-status',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    SpecialistDataComponent,
    PatientConditionComponent,
    SkinAndMucousComponent,
    PharynxComponent,
    HairNailsComponent,
    SubcutaneousFatComponent,
    LymphNodesComponent,
    MusculoskeletalComponent,
    MuscularSystemComponent,
    BoneMuscleSystemComponent,
    ThyroidGlandComponent,
    RespiratorySystemComponent,
    CardiovascularSystemComponent,
    DigestiveSystemComponent,
    UrinarySystemComponent
  ],
  templateUrl: './therapeutic-status.component.html',
  styleUrls: ['./therapeutic-status.component.scss']
})
export class TherapeuticStatusComponent {
  @ViewChild(SpecialistDataComponent) specialistData!: SpecialistDataComponent;
  @ViewChild(PatientConditionComponent) patientCondition!: PatientConditionComponent;
  @ViewChild(SkinAndMucousComponent) skinAndMucous!: SkinAndMucousComponent;
  @ViewChild(PharynxComponent) pharynx!: PharynxComponent;
  @ViewChild(HairNailsComponent) hairNails!: HairNailsComponent;
  @ViewChild(SubcutaneousFatComponent) subcutaneousFat!: SubcutaneousFatComponent;
  @ViewChild(LymphNodesComponent) lymphNodes!: LymphNodesComponent;
  @ViewChild(MusculoskeletalComponent) musculoskeletal!: MusculoskeletalComponent;
  @ViewChild(MuscularSystemComponent) muscularSystem!: MuscularSystemComponent;
  @ViewChild(BoneMuscleSystemComponent) boneMuscleSystem!: BoneMuscleSystemComponent;
  @ViewChild(ThyroidGlandComponent) thyroidGland!: ThyroidGlandComponent;
  @ViewChild(RespiratorySystemComponent) respiratorySystem!: RespiratorySystemComponent;
  @ViewChild(CardiovascularSystemComponent) cardiovascularSystem!: CardiovascularSystemComponent;
  @ViewChild(DigestiveSystemComponent) digestiveSystem!: DigestiveSystemComponent;
  @ViewChild(UrinarySystemComponent) urinarySystem!: UrinarySystemComponent;

  /**
   * Начальное раскрытие блоков при входе в форму.
   * Логика и настройка — в expert-examination.config.ts.
   */
  public isBlockExpanded = isBlockExpandedByConfig;

  public onSave(): void {
    console.log('TherapeuticStatus:', {
      specialistData: this.specialistData.getData(),
      patientCondition: this.patientCondition.getData(),
      skinAndMucous: this.skinAndMucous.getData(),
      pharynx: this.pharynx.getData(),
      hairNails: this.hairNails.getData(),
      subcutaneousFat: this.subcutaneousFat.getData(),
      lymphNodes: this.lymphNodes.getData(),
      musculoskeletal: this.musculoskeletal.getData(),
      muscularSystem: this.muscularSystem.getData(),
      boneMuscleSystem: this.boneMuscleSystem.getData(),
      thyroidGland: this.thyroidGland.getData(),
      respiratorySystem: this.respiratorySystem.getData(),
      cardiovascularSystem: this.cardiovascularSystem.getData(),
      digestiveSystem: this.digestiveSystem.getData(),
      urinarySystem: this.urinarySystem.getData()
    });
  }
}
