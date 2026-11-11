import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subject, Subscription, takeUntil } from 'rxjs';
import { ApiService } from '../../../core/api.service';
import { DictionaryService } from '../../../core/service/dictionary.service';
import { PersonFilter } from '../../../dto/elastic/person-filter';
import { Patient } from '../../../dto/elastic/Patient';
import { DictinoryValue } from '../../../dto/dictinory-value';

type PatientsSearchFilter = PersonFilter & {
  regionId: number | null;
  expired: boolean;
  dead: boolean;
  survived: boolean;
};

function emptyFilter(): PatientsSearchFilter {
  return {
    firstname: '', surname: '', iin: '', regionId: null,
    expired: false, dead: false, survived: false
  };
}

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit, OnDestroy {
  isFromOmk = false;
  allPatients: Patient[] = [];
  patients: Patient[] = [];
  page = 1;
  pageSize = 10;
  totalRecords = 0;
  regions: DictinoryValue[] = [];
  personFilter: PatientsSearchFilter = emptyFilter();
  currentIin: string | null = null;
  loading = false;
  searchError: string | null = null;

  private readonly destroy$ = new Subject<void>();
  private searchSubscription?: Subscription;
  private iinDelayHandle?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly api: ApiService,
    private readonly dictionaryService: DictionaryService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.isFromOmk = params.get('source') === 'omk';
    });

    // В проекте уже существует этот endpoint; раньше regions оставался пустым.
    this.dictionaryService.loadRegion('D_REGION')
      .pipe(takeUntil(this.destroy$))
      .subscribe(regions => { this.regions = regions; });
  }

  ngOnDestroy(): void {
    this.cancelIinDelay();
    this.searchSubscription?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalRecords / this.pageSize));
  }

  onIinRequest(iin: string): void {
    this.currentIin = iin;
    this.personFilter = { ...this.personFilter, iin };
    this.cancelIinDelay();
    this.iinDelayHandle = setTimeout(() => this.filter(this.personFilter), 3000);
  }

  filter(patientFilter: PatientsSearchFilter): void {
    this.cancelIinDelay();
    // Отмена устаревшего запроса предотвращает перезапись результатов.
    this.searchSubscription?.unsubscribe();
    this.searchError = null;
    this.loading = true;

    this.searchSubscription = this.api.post<Patient[]>('/api/person/search', patientFilter)
      .pipe(finalize(() => { this.loading = false; }))
      .subscribe({
        next: response => {
          this.allPatients = Array.isArray(response) ? response : [];
          this.totalRecords = this.allPatients.length;
          this.page = 1;
          this.updatePage();
        },
        error: () => {
          this.allPatients = [];
          this.patients = [];
          this.totalRecords = 0;
          this.page = 1;
          this.searchError = 'Не удалось выполнить поиск. Попробуйте ещё раз.';
        }
      });
  }

  updatePage(): void {
    const start = (this.page - 1) * this.pageSize;
    this.patients = this.allPatients.slice(start, start + this.pageSize);
  }

  onPageChange(event: { first?: number; rows?: number }): void {
    this.pageSize = Math.max(1, event.rows || this.pageSize);
    this.page = Math.floor((event.first || 0) / this.pageSize) + 1;
    this.updatePage();
  }

  resetFilter(): void {
    this.cancelIinDelay();
    this.searchSubscription?.unsubscribe();
    this.loading = false;
    this.searchError = null;
    this.personFilter = emptyFilter();
    this.currentIin = null;
    this.page = 1;
    this.allPatients = [];
    this.patients = [];
    this.totalRecords = 0;
  }

  private cancelIinDelay(): void {
    if (this.iinDelayHandle !== undefined) {
      clearTimeout(this.iinDelayHandle);
      this.iinDelayHandle = undefined;
    }
  }

  openHistory(patient: Patient): void {
    void this.router.navigate(
      ['/main/patients/history', patient.iin],
      this.isFromOmk ? { queryParams: { source: 'omk' } } : {}
    );
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warning' | 'danger' {
    const value = (status || '').trim().toLowerCase();
    if (value.includes('умерш')) return 'danger';
    if (value.includes('срок прош')) return 'warning';
    if (value.includes('выехав')) return 'info';
    if (value.includes('активн') || value.includes('нормальн')) return 'success';
    return 'info';
  }
}
