import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ApiService } from '../../../core/api.service';
import { DictionaryService } from '../../../core/service/dictionary.service';
import { Patient } from '../../../dto/elastic/Patient';
import { PatientsListComponent } from './patients-list.component';

describe('PatientsListComponent', () => {
  let component: PatientsListComponent;
  let fixture: ComponentFixture<PatientsListComponent>;
  let api: jasmine.SpyObj<ApiService>;
  let dictionary: jasmine.SpyObj<DictionaryService>;

  beforeEach(async () => {
    api = jasmine.createSpyObj<ApiService>('ApiService', ['post']);
    dictionary = jasmine.createSpyObj<DictionaryService>('DictionaryService', ['loadRegion']);
    dictionary.loadRegion.and.returnValue(of([]));
    api.post.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [PatientsListComponent],
      providers: [
        { provide: ApiService, useValue: api },
        { provide: DictionaryService, useValue: dictionary },
        { provide: Router, useValue: { navigate: jasmine.createSpy().and.resolveTo(true) } },
        { provide: ActivatedRoute, useValue: { queryParamMap: of(convertToParamMap({})) } }
      ]
    })
      // Не требуется подключать PrimeNG для проверки логики компонента.
      .overrideComponent(PatientsListComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(PatientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('создаётся и загружает список регионов', () => {
    expect(component).toBeTruthy();
    expect(dictionary.loadRegion).toHaveBeenCalledWith('D_REGION');
  });

  it('показывает общее число результатов и создаёт страницу', () => {
    const results = Array.from({ length: 12 }, (_, i) => ({ iin: String(i) } as Patient));
    api.post.and.returnValue(of(results));

    component.filter(component.personFilter);

    expect(component.totalRecords).toBe(12);
    expect(component.patients.length).toBe(10);
    component.onPageChange({ first: 10, rows: 10 });
    expect(component.patients.length).toBe(2);
  });

  it('отменяет старый запрос при сбросе', () => {
    const pending = new Subject<Patient[]>();
    api.post.and.returnValue(pending.asObservable());
    component.filter(component.personFilter);
    expect(component.loading).toBeTrue();

    component.resetFilter();
    pending.next([{ iin: '123456789012' } as Patient]);

    expect(component.loading).toBeFalse();
    expect(component.totalRecords).toBe(0);
    expect(component.patients).toEqual([]);
  });
});
