import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {DHelp} from "../../dto/dictionary/DHelp";
import {DictionaryValue} from "../model/dictionary-value";
import {DDoctype} from "../model/dictionary/d-doctype";
import {NosologyTreeDto} from "../../dto/dictionary/nosology-tree-dto";
import {MseDto} from "../../dto/mse-dto";

@Injectable({ providedIn: 'root' })
export class DictionaryService {

    constructor(private api: ApiService) {}

    load(id: number, code: string): Observable<DictionaryValue[]> {
        const cached = localStorage.getItem(code);
        if (cached) {
            try {
                const parsed = JSON.parse(cached) as DictionaryValue[];
                return of(parsed);
            } catch {}
        }

        return this.api.get<DictionaryValue[]>('/dictionary/value/all/' + id).pipe(
            tap(response => {
                localStorage.setItem(code, JSON.stringify(response));
            }),
            catchError(err => {
                console.error('Ошибка сервера', err);
                return of([] as DictionaryValue[]);
            })
        );
    }

  loadRegion(code: string): Observable<DictionaryValue[]> {
    // const cached = localStorage.getItem(code);
    // if (cached) {
    //   try {
    //     const parsed = JSON.parse(cached) as DictionaryValue[];
    //     return of(parsed);
    //   } catch {}
    // }

    return this.api.get<DictionaryValue[]>('/dictionary/value/region').pipe(
      tap(response => {
        localStorage.setItem(code, JSON.stringify(response));
      }),
      catchError(err => {
        console.error('Ошибка сервера', err);
        return of([] as DictionaryValue[]);
      })
    );
  }

    loadDHelp(code: string): Observable<DHelp[]> {
        const cached = localStorage.getItem(code);
        if (cached) {
            try {
                const parsed = JSON.parse(cached) as DHelp[];
                return of(parsed);
            } catch {}
        }

        return this.api.get<DHelp[]>('/other-dictionary/' + code).pipe(
            tap(response => {
                localStorage.setItem(code, JSON.stringify(response));
            }),
            catchError(err => {
                console.error('Ошибка сервера', err);
                return of([] as DHelp[]);
            })
        );
    }

  loadWithCode(code: string): Observable<DictionaryValue[]> {
    const cached = localStorage.getItem(code);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as DictionaryValue[];
        return of(parsed);
      } catch {}
    }

    return this.api.get<DictionaryValue[]>('/dictionary/value/all/' + code).pipe(
      tap(response => {
        localStorage.setItem(code, JSON.stringify(response));
      }),
      catchError(err => {
        console.error('Ошибка сервера', err);
        return of([] as DictionaryValue[]);
      })
    );
  }

  /** Наименование классов (форма 7) */
  loadNameClasses(): Observable<DictionaryValue[]> {
    return this.api.get<DictionaryValue[]>('/dictionary/dict-nameclasses/all').pipe(
      catchError(err => {
        console.error('Ошибка загрузки nameClasses', err);
        return of([] as DictionaryValue[]);
      })
    );
  }

  /** Нозологии по МКБ10 (дочерний список по выбранному классу) */
  loadMkbByClass(classId: number): Observable<DictionaryValue[]> {
    return this.api.get<DictionaryValue[]>(`/dictionary/dict-mkb10/findByParNameClassesId/${classId}`).pipe(
      catchError(err => {
        console.error(`Ошибка загрузки mkbList для classId=${classId}`, err);
        return of([] as DictionaryValue[]);
      })
    );
  }

  loadDisability(code: number, patientId: number): Observable<DictionaryValue[]> {
    return this.api.get<DictionaryValue[]>(`/dictionary/value/disability/${code}/${patientId}`).pipe(
      catchError(err => {
        console.error(`Ошибка загрузки Disability для classId=${code}`, err);
        return of([] as DictionaryValue[]);
      })
    );
  }


  loadDictWithCodeAndGroupId(id: number, code: string, groupId: number): Observable<DictionaryValue[]> {
    const cacheKey = `${code}_${groupId}`
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as DictionaryValue[];
        return of(parsed);
      } catch {
        localStorage.removeItem(cacheKey);
      }
    }

    return this.api.get<DictionaryValue[]>('/dictionary/value/all/' + id +'/'+ groupId).pipe(
      tap(response => {
        localStorage.setItem(cacheKey, JSON.stringify(response));
      }),
      catchError(err => {
        console.error('Ошибка сервера', err);
        return of([] as DictionaryValue[]);
      })
    );
  }

  loadDDoctype(): Observable<DDoctype[]> {
    return this.api.get<DDoctype[]>('/dictionary/d-doctype').pipe(
      catchError(err => {
        console.error('Ошибка загрузки dDoctype', err);
        return of([] as DDoctype[]);
      })
    );
  }


    getFromCache(code: string): DictionaryValue[] {
        const raw = localStorage.getItem(code);
        return raw ? JSON.parse(raw) as DictionaryValue[] : [];
    }

    getMkbTree(code: string): Observable<NosologyTreeDto[]> {

      const cached = localStorage.getItem(code);
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as NosologyTreeDto[];
          return of(parsed);
        } catch {}
      }

      return this.api.get<NosologyTreeDto[]>('/dictionary/dict-mkb10/mkb-tree');
    }

    getMse(): Observable<MseDto[]> {
      return this.api.get<MseDto[]>('/dictionary/d-mse');
    }
}
