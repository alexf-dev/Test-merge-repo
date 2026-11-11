import {Component, OnInit} from '@angular/core';
import {ResolutionApprovedFilter} from "../../../dto/resolutionApproved/resolution-approved-filter";
import {DictionaryService} from "../../../core/service/dictionary.service";
import {CamundaService} from "../../../core/service/camunda.service";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../../core/service/auth.service";
import {Router} from "@angular/router";
import {PageResponse} from "../../../dto/page-response";
import {ResolutionApprovedResponse} from "../../../dto/resolutionApproved/resolution-approved-response";

@Component({
  selector: 'app-resolution-approved',
  templateUrl: './resolution-approved.component.html',
  styleUrl: './resolution-approved.component.css'
})
export class ResolutionApprovedComponent implements OnInit {

  resolutionApprovedResponse: ResolutionApprovedResponse[] = [];
  pageResponse!: PageResponse<ResolutionApprovedResponse>;

  omkDialogVisible = false;
  selectedRow: any = null;

  resolutionApprovedFilter: ResolutionApprovedFilter = {
    iin: '',
    actNumber: '',
    surname: '',
    name: '',
    pageNum: 1,
    pageSize: 10,
  };

  constructor(
    private dictionaryService: DictionaryService,
    private camundaService: CamundaService,
    private translate: TranslateService,
    public authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.camundaService.getResolutionApproved(this.resolutionApprovedFilter).subscribe(res => {
      this.pageResponse = res;
      this.resolutionApprovedResponse = this.pageResponse.list;
    });
  }

  clear(): void {
    this.resolutionApprovedFilter = {
      actNumber: '',
      iin: '',
      surname: '',
      name: '',
      pageNum: 1,
      pageSize: 10,
    };

    this.search();
  }

  openExpertOpinion(patientId: number, expertOpinionId: number): void {
    this.router.navigate(['/main/examination', patientId, expertOpinionId]);
  }

  onPageChange(event: any): void {
    this.resolutionApprovedFilter.pageNum = event.first / event.rows + 1;
    this.resolutionApprovedFilter.pageSize = event.rows;
    this.search();
  }

  openOmkModal(row: any): void {
    this.selectedRow = row;
    this.omkDialogVisible = true;
  }
}
