import {Component, OnInit} from '@angular/core';
import {catchError, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api.service";
import {Address, PersonDto} from "../../../dto/gbdfl-person-dto";
import {F031MainService} from "../../../core/service/f031-main.service";
import {MessageService} from "primeng/api";
import {Declaration} from "../../../core/model/declaration";
import {CamundaService} from "../../../core/service/camunda.service";
import {CreateExaminationDto, CreateExaminationResponseDto} from "../../../core/model/create-examination-dto";
import {Examination} from "../../../core/model/examination";

@Component({
  selector: 'app-gbdfl-find',
  templateUrl: './gbdfl-find.component.html',
  styleUrls: ['./gbdfl-find.component.css']
})
export class GbdflFindComponent implements OnInit {
  patient: PersonDto | null = null;
  iin: string;
  declarations: Declaration[];
  naoExaminations: Examination[];
  activeSection = 'main-info';
  // Состояния для разворачивания секций (true - раскрыта, false - свернута)
  sectionOpen: { [key: string]: boolean } = {
    'main-info': true,
    'address': false,
    'social': false,
    'zayavlenie': false,
    'oop': false,
    'rynok': false,
    'oxrana': false,
    'esobes': false
  };

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router,
              private f031MainService: F031MainService,
              private messageService: MessageService,
              private camundaService: CamundaService) {
  }

  ngOnInit(): void {
    let defaultPatient = this.patient;

    const iin = this.route.snapshot.paramMap.get('iin');
    this.iin = iin;
    this.api.get<PersonDto>(`/api/kafka/send-gbdfl-by-iin/${iin}`).pipe(
      catchError(error => {
        // Здесь ты можешь вывести сообщение, залогировать ошибку и т.д.
        console.error('Ошибка загрузки пациента', error);
        // Возвращаем observable с дефолтным объектом
        return of(defaultPatient);
      })
    ).subscribe(patient => {
      this.patient = patient;
      console.log(patient)
    });
    if (this.iin) {
      this.loadDeclarations(this.iin);
      this.loadNao(this.iin);
    }
  }

  scrollTo(sectionId: string) {
    this.activeSection = sectionId;
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }, 10);
  }

  toggleSection(sectionId: string) {
    this.sectionOpen[sectionId] = !this.sectionOpen[sectionId];
  }

  openMsk(iin: string): void {
    this.f031MainService.getActualF031MainId(iin).pipe(
      switchMap((mainId) => {
        return this.api.post<Declaration>(`/api/declaration/${iin}`, {});
      })
    ).subscribe({
      next: (declaration) => {
        this.router.navigate(['/main/msk', declaration.id]);
      },
      error: (err) => {
        if (err.status === 404) {
          this.messageService.add({
            severity: 'error',
            summary: 'Форма не найдена',
            detail: 'Для данного ИИН форма 031 отсутствует'
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Не удалось создать заявление'
          });
        }
      }
    });
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

  loadDeclarations(iin: string): void {
    this.api.get<Declaration[]>(`/api/declaration`, {
      iin: iin
    }).subscribe({
      next: (data) => {
        this.declarations = data ?? [];
      },
      error: (err) => {
        console.error('Ошибка загрузки деклараций', err);
      }
    });
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'NEW':
        return 'Черновик';
      case 'SENT':
        return 'Отправлено';
      case 'APPROVED':
        return 'Одобрено';
      default:
        return status ?? '';
    }
  }

  statusClass(status: string): 'success' | 'info' | 'secondary' | 'warning' | 'danger' | 'contrast' {
    switch (status) {
      case 'DRAFT':
        return 'secondary';

      case 'SENT':
        return 'info';

      case 'APPROVED':
        return 'success';

      default:
        return 'secondary';
    }
  }

  createNewCase(row: any): void {
    const request: CreateExaminationDto = {
      personId: this.patient.id,
      appId: row?.id
    };


    this.camundaService.submit(request).subscribe({
      next: (dto: CreateExaminationResponseDto) => {
        console.log('Успешно создано дело:', dto);
        this.router.navigate(['/main/examination', dto.patientId, dto.expertOpinionId]);
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось создать дело'
        });
      }
    });
  }

  loadNao(iin: string): void {
    this.api.get<Examination[]>(`/api/examination/nao`, {
      iin: iin
    }).subscribe({
      next: (data) => {
        this.naoExaminations = data ?? [];
      },
      error: (err) => {
        console.error('Ошибка загрузки освидетельствований', err);
      }
    });
  }
}
