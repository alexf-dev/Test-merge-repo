import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DictionaryValue} from "../../../core/model/dictionary-value";
import {DictionaryService} from "../../../core/service/dictionary.service";
import {CamundaService} from "../../../core/service/camunda.service";
import {Patient} from "../../../core/model/patient";
import {Address} from "../../../dto/gbdfl-person-dto";

@Component({
    selector: 'app-reg-data',
    templateUrl: './reg-data.component.html',
    styleUrl: './reg-data.component.css'
})
export class RegDataComponent implements OnInit {
    @Input() patientId!: number;
    @Input() expertOpinionId!: number;
    @Output() next = new EventEmitter<void>();
    @Output() prev = new EventEmitter<void>();

    patient: Patient = null;

    dicGenders: DictionaryValue[] = [];
    dicDistricts: DictionaryValue[] = [];

    constructor(private dictionaryService: DictionaryService,
                private camundaService: CamundaService) {
    }

    ngOnInit(): void {

        this.dictionaryService.load(3, 'sex').subscribe(res => {
            this.dicGenders = res;
        });
        this.dictionaryService.load(113, 'd_district_bi').subscribe(res => {
            this.dicDistricts = res;
        });
        if (this.patientId) {
            this.loadPatient(this.patientId);
        }
    }

    getAddressString(address: Address): string {
      if (!address) return '';

      const city = address.addressDistricts?.nameRu || '';
      const region = address.addressRegion?.nameRu || '';
      const street = address.addressStreet || '';
      const building = address.addressBuilding || '';
      const flat = address.addressFlat ? `кв. ${address.addressFlat}` : '';

      return [city, region, street, building, flat]
        .filter(Boolean)
        .join(', ');
    }

    onNext() {
        this.camundaService.savePatient(this.patient).subscribe({
            next: response => {
                this.next.emit();
                console.log(response);
            },
            error: error => {
                console.log(error);
            }
        })
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
}
