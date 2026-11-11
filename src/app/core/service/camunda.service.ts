import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Patient} from '../model/patient';
import {SocialData} from "../model/social-data";
import {Examination} from "../model/examination";
import {Expertopinion} from "../model/expertopinion";
import {Guardian} from "../model/guardian";
import {IprDataList} from "../model/iprDataList";
import {ApiService} from "../api.service";
import {ExaminationDirectionDto} from "../../dto/examination-direction-dto";
import {ExpertOpinionRequest} from "../model/expertopinion-dto";
import {SignAndUpdateStatusDto} from "../../dto/sign-and-update-status-dto";
import {EdsInfo} from "../../dto/eds-info";
import {DocumentsListDto} from "../model/documents-dto";
import {CreateExaminationDto, CreateExaminationResponseDto} from "../model/create-examination-dto";
import {ReexaminationAppealDto} from "../../dto/omk/reexamination-appeal-dto";
import {AppealJournalFilterRequest} from "../model/appeal-journal-filter-request";
import {PageResponse} from "../../dto/page-response";
import {AppealJournalResponse} from "../../dto/omk/appeal-journal-response";
import {ExpertOpinionOmk} from "../../dto/omk/expert-opinion-omk";
import {ReexaminationAppealUpdate} from "../../dto/omk/reexamination-appeal-update";
import {ReestrExpertsFilter} from "../model/reestr-experts-filter";
import {ReestrExpertsResponse} from "../../dto/reestrExperts/reestr-experts-response";
import {MkbsVacationsResponseDto} from "../../dto/reestrExperts/mkbs-vacations-response-dto";
import {ExpertOpinionSmallDto} from "../../dto/omk/expert-opinion-small-dto";
import {CreateReestrExpertDto} from "../../dto/reestrExperts/create-reestr-expert-dto";
import {UpdateStatusExpertDto} from "../../dto/reestrExperts/update-status-expert-dto";
import {ResolutionApprovedFilter} from "../../dto/resolutionApproved/resolution-approved-filter";
import {ResolutionApprovedResponse} from "../../dto/resolutionApproved/resolution-approved-response";
import {JournalApprovalFilter} from "../model/journal-approval-filter";
import {JournalApprovalResponseDto} from "../../dto/journaApproval/journal-approval-response-dto";
import {RegisteredAct} from "../../dto/act/registered-act";
import {ReestrExpertIeExcludeDto} from "../model/reestr-expert-ie-exclude-dto";
import {FaceDataDto} from "../model/face-data";
import {FaceDataResponseDto} from "../model/face-data-response";
import {SignAndUpdateStatusResult} from "../model/sign-and-update-status-result";
import {IprSignDto} from "../../dto/journaApproval/ipr-sign-dto";

@Injectable({providedIn: 'root'})
export class CamundaService {
    constructor(private api: ApiService) {
    }

    getById(id: number): Observable<Patient> {
        return this.api.get<Patient>(`/api/examination/patient/${id}`);
    }

    savePatient(patient: Patient): Observable<Patient> {
        return this.api.post(`/api/examination/patient`, patient);
    }

    getSocialByPatientId(patientId: number): Observable<SocialData> {
        return this.api.get<SocialData>(`/api/examination/social/${patientId}`);
    }

    saveSocialData(socialData: SocialData): Observable<any> {
        return this.api.post(`/api/examination/social`, socialData);
    }

    getExaminationByPatientId(patientId: number): Observable<Examination> {
        return this.api.get<Examination>(`/api/examination/examination/${patientId}`);
    }

    saveExamination(examination: Examination): Observable<any> {
        return this.api.post(`/api/examination/save-examination`, examination);
    }

    getExpertOpinionById(expertOpinionId: number): Observable<Expertopinion> {
        return this.api.get<Expertopinion>(`/api/examination/expertOpinion/${expertOpinionId}`);
    }


    getGuardianByPatientId(patientId: number): Observable<Guardian> {
        return this.api.get<Guardian>(`/api/examination/guardian/${patientId}`);
    }

    saveGuardian(guardian: Guardian): Observable<any> {
        return this.api.post(`/api/examination/guardian`, guardian);
    }

    getIprDataListByExpertOpinionId(expertOpinionId: number): Observable<IprDataList> {
        return this.api.get<IprDataList>(`/api/examination/ipr/${expertOpinionId}`);
    }

    saveIprDataList(iprDataList: IprDataList): Observable<any> {
        return this.api.post(`/api/examination/ipr`, iprDataList);
    }

    // getExaminationDirection(patientId: number, directionIds: number[]): Observable<boolean> {
    //   let params = new HttpParams();
    //   directionIds.forEach(id => {
    //     params = params.append('directionId', id.toString());
    //   });
    //
    //   return this.api.get<boolean>(`/api/examination/examination-direction/${patientId}`, {params});
    // }

  getDirectionList(expertOpinionId: number): Observable<ExaminationDirectionDto[]> {
    return this.api.get<ExaminationDirectionDto[]>(`/api/examination/expert-opinions/direction/${expertOpinionId}`);
  }

  getExpertOpinionByPatient(expertOpinionId: number) {
    return this.api.get<ExpertOpinionRequest | null>(`/api/examination/expert-opinions/${expertOpinionId}`);
  }

  saveExpertOpinion(id: number, body: ExpertOpinionRequest) {
    return this.api.post<number>(`/api/examination/expert-opinions/save`, body);
  }

  getSignXmls(expertOpinionId: number) {
    return this.api.get<IprSignDto | null>(`/api/journal-approval/sign/${expertOpinionId}`);
  }

  signAndUpdateStatus(signAndUpdateStatusDto: SignAndUpdateStatusDto): Observable<SignAndUpdateStatusResult> {
    return this.api.post<SignAndUpdateStatusResult>(`/api/journal-approval/sign-and-update-status`, signAndUpdateStatusDto);
  }

  signWithPhoto(faceData: FaceDataDto): Observable<FaceDataResponseDto> {
    return this.api.post(`/api/journal-approval/sign-with-face`, faceData);
  }

  getDocuments(formId: number): Observable<DocumentsListDto> {
    return this.api.get<DocumentsListDto>(
      `/api/examination/documents/${formId}`
    );
  }

  submit(request: CreateExaminationDto): Observable<CreateExaminationResponseDto> {
    return this.api.post<CreateExaminationResponseDto>(
      '/api/examination',
      request
    );
  }

  saveOmk(formData: FormData) {
    return this.api.post<number>(`/api/omk/save`, formData);
  }

  getOmkByPatientId(patientId: number): Observable<ReexaminationAppealDto> {
    return this.api.get<ReexaminationAppealDto>(`/api/omk/${patientId}`);
  }

  getOmkByAppealId(appealId: number): Observable<ReexaminationAppealDto> {
    return this.api.get<ReexaminationAppealDto>(`/api/omk/appeal/${appealId}`);
  }

  getAppealJournal(request: AppealJournalFilterRequest) {
      return this.api.post<PageResponse<AppealJournalResponse>>(
        '/api/omk/search', request
      );
  }

  getReestrExperts(request: ReestrExpertsFilter) {
    return this.api.post<PageResponse<ReestrExpertsResponse>>(
      '/api/reestr-experts/search', request
    );
  }

  getReestrIEExperts(request: ReestrExpertsFilter) {
    return this.api.post<PageResponse<ReestrExpertsResponse>>(
      '/api/reestr-experts/search-ie', request
    );
  }

  getMkbsVacations(expertId: number): Observable<MkbsVacationsResponseDto> {
      return this.api.get<MkbsVacationsResponseDto>(`/api/reestr-experts/mkbs-vacations/${expertId}`);
  }


  getExpertOpinionByPatientId(patientId: number): Observable<ExpertOpinionOmk> {
    return this.api.get<ExpertOpinionOmk>(`/api/omk/expert-opinion/${patientId}`);
  }

  updateAppealStatusOmk(reexaminationAppealUpdate: ReexaminationAppealUpdate) {
    return this.api.put<number>(`/api/omk/update-appeal-status`, reexaminationAppealUpdate);
  }

  considerOmk(expertOpinionId: number, appealId: number) {
    return this.api.post<number>(`/api/omk/consider/${expertOpinionId}/${appealId}`);
  }

  getExpertOpinionId(patientId: number): Observable<ExpertOpinionSmallDto> {
    return this.api.get<ExpertOpinionSmallDto>(`/api/omk/consider/${patientId}`);
  }

  saveReestrExpert(createReestrExpert: CreateReestrExpertDto) {
      return this.api.post<CreateReestrExpertDto>('/api/reestr-experts/save-expert', createReestrExpert);
  }

  updateStatusReestrExpert(updateStatusExpert: UpdateStatusExpertDto) {
      return this.api.put('/api/reestr-experts/update-status-expert', updateStatusExpert);
  }

  getResolutionApproved(request: ResolutionApprovedFilter) {
    return this.api.post<PageResponse<ResolutionApprovedResponse>>(
      '/api/resolution-approved/search', request
    );
  }

  excludeIEExpert(reestrExpertIeExclude: ReestrExpertIeExcludeDto) {
    return this.api.post<void>('/api/reestr-experts/exclude-ie-expert', reestrExpertIeExclude);
  }


  getJournalApproval(request: JournalApprovalFilter) {
    return this.api.post<PageResponse<JournalApprovalResponseDto>>(
      '/api/journal-approval/search', request
    );
  }

  getRegisteredActsJournal(request: any){
      return this.api.post<PageResponse<RegisteredAct>>(
          '/api/registered-acts/search', request
      );
  }

  getExpertOpinionByMainIdAndRepeat(mainId: number, repeat: number) {
      return this.api.get<ExpertOpinionRequest | null>(`/api/examination/expert-opinions/mainId/${mainId}/repeat/${repeat}`);
  }

}
