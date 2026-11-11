import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

import { OphSpecialistDataComponent } from './components/specialist-data/specialist-data.component';
import { OphVisualAcuityComponent } from './components/visual-acuity/visual-acuity.component';
import { OphPerimetryComponent } from './components/perimetry/perimetry.component';
import { OphIntraocularPressureComponent } from './components/intraocular-pressure/intraocular-pressure.component';
import { OphEyelidsComponent } from './components/eyelids/eyelids.component';
import { OphEyeballsComponent } from './components/eyeballs/eyeballs.component';
import { OphNystagmusComponent } from './components/nystagmus/nystagmus.component';
import { OphConjunctivaComponent } from './components/conjunctiva/conjunctiva.component';
import { OphLacrimalApparatusComponent } from './components/lacrimal-apparatus/lacrimal-apparatus.component';
import { OphCorneaComponent } from './components/cornea/cornea.component';
import { OphScleraComponent } from './components/sclera/sclera.component';
import { OphAnteriorChamberComponent } from './components/anterior-chamber/anterior-chamber.component';
import { OphPupilsComponent } from './components/pupils/pupils.component';
import { OphIrisComponent } from './components/iris/iris.component';
import { OphVitreousBodyComponent } from './components/vitreous-body/vitreous-body.component';
import { OphLensComponent } from './components/lens/lens.component';
import { OphFundusComponent } from './components/fundus/fundus.component';
import { OphPatientBehaviorComponent } from './components/patient-behavior/patient-behavior.component';
import { OphSignedInJournalComponent } from './components/signed-in-journal/signed-in-journal.component';
import { OphGlassesCorrectionComponent } from './components/glasses-correction/glasses-correction.component';
import { OphthalmologicalDataDTO } from './models/ophthalmological-data.models';

@Component({
  selector: 'app-ophthalmological-data',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    OphSpecialistDataComponent,
    OphVisualAcuityComponent,
    OphPerimetryComponent,
    OphIntraocularPressureComponent,
    OphEyelidsComponent,
    OphEyeballsComponent,
    OphNystagmusComponent,
    OphConjunctivaComponent,
    OphLacrimalApparatusComponent,
    OphCorneaComponent,
    OphScleraComponent,
    OphAnteriorChamberComponent,
    OphPupilsComponent,
    OphIrisComponent,
    OphVitreousBodyComponent,
    OphLensComponent,
    OphFundusComponent,
    OphPatientBehaviorComponent,
    OphSignedInJournalComponent,
    OphGlassesCorrectionComponent
  ],
  templateUrl: './ophthalmological-data.component.html',
  styleUrls: ['./ophthalmological-data.component.scss']
})
export class OphthalmologicalDataComponent {
  @ViewChild(OphSpecialistDataComponent) specialistDataComponent!: OphSpecialistDataComponent;
  @ViewChild(OphVisualAcuityComponent) visualAcuityComponent!: OphVisualAcuityComponent;
  @ViewChild(OphPerimetryComponent) perimetryComponent!: OphPerimetryComponent;
  @ViewChild(OphIntraocularPressureComponent) intraocularPressureComponent!: OphIntraocularPressureComponent;
  @ViewChild(OphEyelidsComponent) eyelidsComponent!: OphEyelidsComponent;
  @ViewChild(OphEyeballsComponent) eyeballsComponent!: OphEyeballsComponent;
  @ViewChild(OphNystagmusComponent) nystagmusComponent!: OphNystagmusComponent;
  @ViewChild(OphConjunctivaComponent) conjunctivaComponent!: OphConjunctivaComponent;
  @ViewChild(OphLacrimalApparatusComponent) lacrimalApparatusComponent!: OphLacrimalApparatusComponent;
  @ViewChild(OphCorneaComponent) corneaComponent!: OphCorneaComponent;
  @ViewChild(OphScleraComponent) scleraComponent!: OphScleraComponent;
  @ViewChild(OphAnteriorChamberComponent) anteriorChamberComponent!: OphAnteriorChamberComponent;
  @ViewChild(OphPupilsComponent) pupilsComponent!: OphPupilsComponent;
  @ViewChild(OphIrisComponent) irisComponent!: OphIrisComponent;
  @ViewChild(OphVitreousBodyComponent) vitreousBodyComponent!: OphVitreousBodyComponent;
  @ViewChild(OphLensComponent) lensComponent!: OphLensComponent;
  @ViewChild(OphFundusComponent) fundusComponent!: OphFundusComponent;
  @ViewChild(OphPatientBehaviorComponent) patientBehaviorComponent!: OphPatientBehaviorComponent;
  @ViewChild(OphSignedInJournalComponent) signedInJournalComponent!: OphSignedInJournalComponent;
  @ViewChild(OphGlassesCorrectionComponent) glassesCorrectionComponent!: OphGlassesCorrectionComponent;

  public getData(): OphthalmologicalDataDTO {
    return {
      specialistData: this.specialistDataComponent.getData(),
      visualAcuity: this.visualAcuityComponent.getData(),
      perimetry: this.perimetryComponent.getData(),
      intraocularPressure: this.intraocularPressureComponent.getData(),
      eyelids: this.eyelidsComponent.getData(),
      eyeballs: this.eyeballsComponent.getData(),
      nystagmus: this.nystagmusComponent.getData(),
      conjunctiva: this.conjunctivaComponent.getData(),
      lacrimalApparatus: this.lacrimalApparatusComponent.getData(),
      cornea: this.corneaComponent.getData(),
      sclera: this.scleraComponent.getData(),
      anteriorChamber: this.anteriorChamberComponent.getData(),
      pupils: this.pupilsComponent.getData(),
      iris: this.irisComponent.getData(),
      vitreousBody: this.vitreousBodyComponent.getData(),
      lens: this.lensComponent.getData(),
      fundus: this.fundusComponent.getData(),
      patientBehavior: this.patientBehaviorComponent.getData(),
      signedInJournal: this.signedInJournalComponent.getData(),
      glassesCorrection: this.glassesCorrectionComponent.getData()
    };
  }

  public setData(data: OphthalmologicalDataDTO): void {
    this.specialistDataComponent.setData(data.specialistData);
    this.visualAcuityComponent.setData(data.visualAcuity);
    this.perimetryComponent.setData(data.perimetry);
    this.intraocularPressureComponent.setData(data.intraocularPressure);
    this.eyelidsComponent.setData(data.eyelids);
    this.eyeballsComponent.setData(data.eyeballs);
    this.nystagmusComponent.setData(data.nystagmus);
    this.conjunctivaComponent.setData(data.conjunctiva);
    this.lacrimalApparatusComponent.setData(data.lacrimalApparatus);
    this.corneaComponent.setData(data.cornea);
    this.scleraComponent.setData(data.sclera);
    this.anteriorChamberComponent.setData(data.anteriorChamber);
    this.pupilsComponent.setData(data.pupils);
    this.irisComponent.setData(data.iris);
    this.vitreousBodyComponent.setData(data.vitreousBody);
    this.lensComponent.setData(data.lens);
    this.fundusComponent.setData(data.fundus);
    this.patientBehaviorComponent.setData(data.patientBehavior);
    this.signedInJournalComponent.setData(data.signedInJournal);
    this.glassesCorrectionComponent.setData(data.glassesCorrection);
  }

  public onSave(): void {
    console.log('OphthalmologicalDataDTO:', this.getData());
  }
}
