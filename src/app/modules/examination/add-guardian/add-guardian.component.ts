import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Guardian} from "../../../core/model/guardian";
import {ApiService} from "../../../core/api.service";
import {DictionaryService} from "../../../core/service/dictionary.service";
import {CamundaService} from "../../../core/service/camunda.service";
import {DictionaryValue} from "../../../core/model/dictionary-value";

export interface DocumentItem {
    id: string;
    title: string;
    source: string;
    requestedAt?: Date | null;
    requested: boolean;
    canView: boolean;
    open: boolean;
    content?: string;
}

@Component({
    selector: 'app-add-guardian',
    templateUrl: './add-guardian.component.html',
    styleUrl: './add-guardian.component.css'
})
export class AddGuardianComponent implements OnInit {
    @Input() patientId!: number;
    @Output() next = new EventEmitter<void>();
    @Output() prev = new EventEmitter<void>();

    searchIin: string;
    guardian: Guardian;
    dicGenders: DictionaryValue[] = [];
    dicRelativeType: DictionaryValue[] = [];
    docs: DocumentItem[] = [
        {id: 'id-card', title: 'Удостоверение личности и адресная справка опекуна или попечителя', source: 'Запрос из ГО', requested: false, canView: false, open: false},
        {id: 'child-birth', title: 'Свидетельство о рождении ребенка-инвалида до 16 лет', source: 'Запрос из ГО', requested: false, canView: false, open: false},
        {id: 'care-allowance', title: 'Заявление для назначения пособия воспитывающему ребенка-инвалида', source: '—', requested: false, canView: false, open: false},
        {id: 'marriage', title: 'Свидетельство о заключении (расторжении) брака', source: '—', requested: false, canView: false, open: false},
        {id: 'guardianship', title: 'Документ, подтверждающий установление опеки над совершеннолетним', source: '—', requested: false, canView: false, open: false}
    ];

    constructor(private api: ApiService, private dictionaryService: DictionaryService, private camundaService: CamundaService) {
    }

    ngOnInit(): void {
        this.dictionaryService.load(3, 'sex').subscribe(res => {
            this.dicGenders = res;
        });
        this.dictionaryService.load(101, 'd_relativetype').subscribe(res => {
            this.dicRelativeType = res;
        });
        this.camundaService.getGuardianByPatientId(this.patientId).subscribe({
            next: p => {
                this.guardian = p;
            },
            error: err => {
                console.error(err);
            }
        });
    }

    requestDataByIin() {
        this.api.get("/api/person/gbdfl/" + this.searchIin).subscribe({
            next: data => {
                if (data) {
                    if (!this.guardian) {
                        this.guardian = {}
                    }
                    this.guardian.personId = data;
                    // @ts-ignore
                    this.guardian.personHistoryId = data.personHistoryId;
                }
            },
            error: err => {
                console.error(err);
            }
        })
    };

    onPrev() {
        this.prev.emit();
    }

    onNext() {
        if (this.guardian) {
            const regTime = new Date(this.guardian.personId.regTime).toISOString().slice(0, 19);
            const changeTime = new Date(this.guardian.personId.changeTime).toISOString().slice(0, 19);
            this.guardian.personId.regTime = regTime;
            this.guardian.personId.changeTime = changeTime;
            delete this.guardian.personId.personHistory;
            this.camundaService.saveGuardian(this.guardian).subscribe({
                next: response => {
                    this.next.emit();
                    console.log(response);
                },
                error: error => {
                    console.log(error);
                }
            })
        } else {
            this.next.emit();
        }
    }
}
