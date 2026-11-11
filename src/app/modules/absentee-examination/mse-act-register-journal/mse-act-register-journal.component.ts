import {Component, OnInit} from '@angular/core';
import {DictionaryService} from "../../../core/service/dictionary.service";
import {CamundaService} from "../../../core/service/camunda.service";
import {Router} from "@angular/router";
import {TranslationService} from "../../../core/service/translation.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../../core/service/auth.service";
import {RegisteredAct} from "../../../dto/act/registered-act";
import {PageResponse} from "../../../dto/page-response";

@Component({
  selector: 'app-mse-act-register-journal',
  templateUrl: './mse-act-register-journal.component.html',
  styleUrl: './mse-act-register-journal.component.css'
})
export class MseActRegisterJournalComponent implements OnInit{
  statuses = [
    {name: 'На рассмотрении'},
    {name: 'Утвержден'}
  ];

  registeredActsFilter: any = {
    status: null,
    expertId:  null,
    beginDate: null,
    endDate: null,
    pageNum: 1,
    pageSize: 10,
  };

  registeredActsResponse: RegisteredAct[] = [];
  pageResponse!: PageResponse<RegisteredAct>;

  mode: String = 'in-absentia';

  constructor( private dictionaryService: DictionaryService,
               private camundaService: CamundaService,
               private router: Router,
               private translationService: TranslationService,
               private messageService: MessageService,
               private confirmationService: ConfirmationService,
               public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  search(): void {
    this.camundaService.getRegisteredActsJournal(this.registeredActsFilter).subscribe(res => {
      this.pageResponse = res;
      this.registeredActsResponse = this.pageResponse.list;
    });
  }

  clear(): void {
    this.registeredActsFilter = {
      iin: '',
      status: null,
      type: '',
      pageNum: 1,
      pageSize: 10,
    };

    this.search();
  }

  onPageChange(event: any): void {
    this.registeredActsFilter.pageNum = event.first / event.rows + 1;
    this.registeredActsFilter.pageSize = event.rows;

    this.search();
  }

  getAct(mainId: number): void {
    this.camundaService.getExpertOpinionByMainIdAndRepeat(mainId, 0).subscribe({
      next: (response) => {
        this.router.navigate(['/main/examination', this.mode, response.id]);
      },
      error: (error) => {
        console.error('Ошибка:', error);
      }
    });
  }
}
