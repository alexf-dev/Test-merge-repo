import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CamundaService} from "../../../core/service/camunda.service";
import {DictionaryService} from "../../../core/service/dictionary.service";
import {DictionaryValue} from "../../../core/model/dictionary-value";
import {SocialData} from "../../../core/model/social-data";

@Component({
  selector: 'app-social-data',
  templateUrl: './social-data.component.html',
  styleUrl: './social-data.component.css'
})
export class SocialDataComponent {
  @Input() patientId: number | null = null;
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  socialData: SocialData;
  loading = false;
  error: string | null = null;
  dicFamilySt: DictionaryValue[] = [];
  dicSocialEconomicStatus: DictionaryValue[] = [];
  dicHousingType: DictionaryValue[] = [];
  dicEducationType: DictionaryValue[] = [];
  dicNewProfession: DictionaryValue[] = [];
  dicHarmfulFactors: DictionaryValue[] = [];

  constructor(private dictionaryService: DictionaryService,
              private camundaService: CamundaService) {
  }

  ngOnInit(): void {
    this.dictionaryService.load(44, 'D_FAMILYSTATUS').subscribe(res => {
      this.dicFamilySt = res;
    });
    this.dictionaryService.load(69, 'D_SOCIALECONOMSTATUS').subscribe(res => {
      this.dicSocialEconomicStatus = res;
    });
    this.dictionaryService.load(48, 'D_HOUSINGTYPE').subscribe(res => {
      this.dicHousingType = res;
    });
    this.dictionaryService.load(38, 'D_EDUCATIONTYPE').subscribe(res => {
      this.dicEducationType = res;
    });
    this.dictionaryService.load(111, 'D_NEWPROFESSION').subscribe(res => {
      this.dicNewProfession = res;
    });
    this.dictionaryService.load(113, 'D_HARMFUL_FACTORS').subscribe(res => {
      this.dicHarmfulFactors = res;
    });
    if (this.patientId) {
      this.loadSocialData(this.patientId);
    }
  }

  pushItemFactor(factorId: any, $event) {
    let i = this.isChecked(factorId);
    if (!Array.isArray(this.socialData?.harmfulFactors)) this.socialData.harmfulFactors = [];
    if (i === -1 && $event.target.checked) {
      const l = {
        id: null,
        examinationId: this.socialData?.id ?? null,
        factorId: factorId,
        createDate: new Date()
      };
      this.socialData.harmfulFactors.push(l)
    } else if (i > -1) {
      const arr = this.socialData?.harmfulFactors ?? [];
      const idx = arr.findIndex(v => v?.factorId === factorId);
      this.socialData.harmfulFactors.splice(idx, 1);
    }
  }

  isChecked(l: any): number {
    const arr = this.socialData?.harmfulFactors ?? [];
    return arr.findIndex(v => v?.factorId === l);
  }

  onPrev() {
    this.prev.emit();
  }

  onNext() {
    this.camundaService.saveSocialData(this.socialData).subscribe({
      next: response => {
        this.next.emit();
        console.log(response);
      },
      error: error =>{
        console.log(error);
      }
    })
  }

  private loadSocialData(id: number): void {

    this.camundaService.getSocialByPatientId(id).subscribe({
      next: p => {
        this.socialData = p;
      },
      error: err => {
        this.error = 'Ошибка при загрузке социальных данных';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
