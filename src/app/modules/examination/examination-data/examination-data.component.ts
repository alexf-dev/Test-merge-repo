import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {Examination} from "../../../core/model/examination";
import {DictionaryService} from "../../../core/service/dictionary.service";
import {CamundaService} from "../../../core/service/camunda.service";
import {PersonService} from "../../../core/service/person.service";
import {DictionaryValue} from "../../../core/model/dictionary-value";
import {FormBuilder, FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Patient} from "../../../core/model/patient";

interface RegistrationFlags {
  migration: boolean;
  archive: boolean;
  arrival: boolean;
  baikonur: boolean;
}

@Component({
  selector: 'app-examination-data',
  templateUrl: './examination-data.component.html',
  styleUrl: './examination-data.component.css'
})
export class ExaminationDataComponent {
  @Input() patientId: number | null = null;
  @Input() expertOpinionId: number | null = null;
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  data: Examination;
  patient: Patient = null;
  loading = false;
  error: string | null = null;
  dicExamplace: DictionaryValue[];
  dicGroupDisability: DictionaryValue[];
  dicDisabilityReason: DictionaryValue[];
  dicGoals: DictionaryValue[] = [];
  form = this.fb.group({goals: this.fb.group({})});
  protected readonly String = String;

  constructor(private fb: FormBuilder, private dictionaryService: DictionaryService,
              private camundaService: CamundaService,
              private personService: PersonService, private cdr: ChangeDetectorRef, private route: ActivatedRoute,) {
  }

  ngOnInit(): void {

    // this.dictionaryService.load(15, 'D_Z_DIRECTION').subscribe(res => {
    //   this.dicGoals = res ?? [];
    //   this.form.setControl('goals', this.buildCheckboxGroup(this.dicGoals));
    //   this.cdr.markForCheck();
    // });


    this.dictionaryService.load(43, 'D_EXAMPLACE').subscribe(res => {
      this.dicExamplace = res;
    });
    this.dictionaryService.load(13, 'D_GROUPDISABILITY').subscribe(res => {
      this.dicGroupDisability = res;
    });
    this.dictionaryService.load(14, 'D_CAUSEOFDISABILITY').subscribe(res => {
      this.dicDisabilityReason = res;
    });
    if (this.patientId) {
      this.loadExamination(this.patientId)
      this.loadPatient(this.patientId);
    }
  }

  onPrev() {
    this.prev.emit();
  }

  onNext() {
    this.camundaService.saveExamination(this.data).subscribe({
      next: response => {
        this.next.emit();
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    });

  }

  // isGoalChecked(directionId: number): boolean {
  //   return (this.data.directionDtos ?? []).some(x => x.directionId == directionId);
  // }
  //
  // onGoalChange(directionId: number, checked: boolean): void {
  //   if (!this.data.directionDtos) {
  //     this.data.directionDtos = [];
  //   }
  //
  //   if (checked) {
  //     const exists = this.data.directionDtos.some(x => x.directionId === directionId);
  //     if (!exists) {
  //       this.data.directionDtos.push({directionId})
  //     }
  //   } else {
  //     this.data.directionDtos = this.data.directionDtos.filter(
  //       x => x.directionId !== directionId
  //     );
  //   }
  //
  //   this.applyExclusiveGoalRules(directionId, checked);
  // }

  private buildCheckboxGroup(list: DictionaryValue[]) {
    const g: Record<string, FormControl<boolean>> = {};

    list.forEach(x => {
      g[String(x.id)] = new FormControl<boolean>(false);
    });

    return this.fb.group(g);
  }

  private loadExamination(id: number): void {
    this.loading = true;
    this.error = null;

    this.camundaService.getExaminationByPatientId(id).subscribe({
      next: p => {
        this.data = p;
        this.loading = false;
      },
      error: err => {
        this.error = 'Ошибка при загрузке пациента';
        console.error(err);
        this.loading = false;
      }
    });
  }

  private loadPatient(id: number): void {
    this.camundaService.getById(id).subscribe({
      next: p => {
        this.patient = p;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  // private applyExclusiveGoalRules(directionId: number, checked: boolean): void {
  //   if (!checked) {
  //     return;
  //   }
  //
  //   this.uncheckOtherGoals(directionId, [801, 802, 803]);
  //   this.uncheckOtherGoals(directionId, [804, 805]);
  //   this.uncheckOtherGoals(directionId, [806, 807]);
  //   this.uncheckOtherGoals(directionId, [810, 811]);
  // }

  // private uncheckOtherGoals(currentId: number, group: number[]): void {
  //   if (!group.includes(currentId)) {
  //     return;
  //   }
  //
  //   this.data.directionDtos = (this.data.directionDtos ?? []).filter(
  //     x => x.directionId === currentId || !group.includes(x.directionId!)
  //   );
  // }
}
