import {Injectable} from "@angular/core";
import {ApiService} from "../api.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IndepExpertActsFilter} from "../../dto/completed-work-act/indep-expert-acts-filter";

export interface GeneratedDocumentResponse {
  name: string;
  mimeType: string;
  content: string;
}

@Injectable({providedIn: 'root'})
export class CompletedWorkActsService {

  constructor(private api: ApiService) {
  }

  getExpertId(): Observable<any> {
    return this.api.get(`/api/completed-work-acts/getExpertId`, {});
  }
  getDicMonths(year: string, expertId: number): Observable<any> {
    return this.api.get(`/api/completed-work-acts/dic-months/${year}/${expertId}`, {});
  }
  getDicYears(expertId: number): Observable<any> {
    return this.api.get(`/api/completed-work-acts/dic-years/${expertId}`, {});
  }

  getCompletedWorkActs(params: IndepExpertActsFilter): Observable<any> {
    return this.api.post(`/api/completed-work-acts/all`, params);
  }

  generateDocument(id: number): Observable<GeneratedDocumentResponse> {
    const body = {
      templateId: 2,
      saveType: 3,
      params: {
        id
      },
      internalParams: {
        id: {
          value: String(id),
          type: 'java.lang.Long'
        }
      }
    };

    return this.api.post(
        '/api/document-generation/internal/v1/generateDocument',
        body
    );
  }

  getXmlForSign(id: number): Observable<string> {
    return this.api.get(
        `/api/completed-work-acts/sign/${id}`,
        { responseType: 'text' }
    );
  }

  saveSignedAct(body: {
    id: number;
    status: number;
    expertSignedXml: string;
  }): Observable<any> {
    return this.api.post(
        '/api/completed-work-acts/sign',
        body
    );
  }

  saveRevisionReason(params: {
    actId: number;
    revisionReason: string;
  }): Observable<any> {
    return this.api.post(
        '/api/completed-work-acts/revision-reason',
        params
    );
  }

  getExpertDealsList(actId: number): Observable<any> {
    return this.api.get(`/api/completed-work-acts/expert-deals/${actId}`);
  }

}
