import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from 'src/app/core/api.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {History} from "../../../core/model/history";
import {TranslationService} from "../../../core/service/translation.service";
import {ExpertopinionHistory} from "../../../core/model/expertopinion-history";
import {PersonDto} from "../../../dto/gbdfl-person-dto";
import {AuthService} from "../../../core/service/auth.service";

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {
  historyList: History[] = [];
  person: PersonDto;

  isFromOmk: boolean = false;

  omkDialogVisible = false;
  selectedRow: any = null;

  flattenedData: {
    history: History;
    expertopinion: ExpertopinionHistory;
    firstRow: boolean;
    groupLength: number;
  }[] = [];

  mode: String = 'in-person';

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, public translateService: TranslationService,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.flattenedData = [];
    const id = this.route.snapshot.paramMap.get('id');
    const defaultPatient = {
      fio: 'Неизвестный пациент',
      region: '',
      birth: '',
      status: 'нет данных'
    };
    this.api.get(`/api/history/${id}`).pipe(
      catchError(error => {
        console.error('Ошибка загрузки пациента', error);
        return of(defaultPatient);
      })
    ).subscribe(data => {
      this.historyList = data as History[];
      this.flattenData();
    });
    this.api.get(`/api/history/person/${id}`).pipe(
      catchError(error => {
        console.error('Ошибка загрузки пациента', error);
        return of(defaultPatient);
      })
    ).subscribe(data => {
      this.person = data as PersonDto;
      this.flattenData();
    });

    this.route.queryParamMap.subscribe( params => {
      const source = params.get('source');
      this.isFromOmk = source === 'omk';
    });
  }

  openKpu(iin: string) {
    this.router.navigate(['/main/kpu', iin]); // или patient.iin, если идентификатор — это ИИН
  }

  flattenData(): void {
    this.flattenedData = [];

    for (const history of this.historyList) {
      const expertList = history.expertopinionList || [];
      expertList.forEach((eo, index) => {
        this.flattenedData.push({
          history,
          expertopinion: eo,
          firstRow: index === 0,
          groupLength: expertList.length
        });
      });

    }

  }

  openExamination(patientId: number, expertOpinionId: number) {
    this.router.navigate(['/main/examination', this.mode, patientId, expertOpinionId]);
  }

  openOmkModal(row: any): void {
    this.selectedRow = row;
    this.omkDialogVisible = true;
  }

}
