import { Component, EventEmitter, Output } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api.service";
import {TranslationService} from "../../../core/service/translation.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {History} from "../../../core/model/history";

@Component({
  selector: 'app-iin-request-empty',
  templateUrl: './iin-request-empty.component.html',
  styleUrls: ['./iin-request-empty.component.css']
})
export class IinRequestEmptyComponent {
  iin = '';

  @Output() requestIin = new EventEmitter<string>();

  constructor( private api: ApiService,  public translateService: TranslationService) {}

  onlyDigits(ev: KeyboardEvent) {
    const c = ev.key;
    if (!/[0-9]/.test(c)) {
      ev.preventDefault();
    }
  }

  send() {
    const trimmed = (this.iin || '').trim();
    if (/^\d{12}$/.test(trimmed)) {
      this.requestIin.emit(trimmed);
      this.api.get("/api/kafka/send-gbdfl-by-iin/" + trimmed).pipe(
        catchError(error => {
          console.error('Ошибка загрузки пациента', error);
          return of("defaultPatient");
        })
      ).subscribe(data => {
       console.log(data)
      });
    } else {
      alert('Введите корректный ИИН (12 цифр)');
    }
  }

  get disabled(): boolean {
    return !/^\d{12}$/.test(this.iin || '');
  }
}
