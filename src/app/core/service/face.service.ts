import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Patient} from '../model/patient';
import {SocialData} from "../model/social-data";
import {Examination} from "../model/examination";
import {Expertopinion} from "../model/expertopinion";
import {Guardian} from "../model/guardian";
import {IprDataList} from "../model/iprDataList";
import {ApiService} from "../api.service";
import {HttpParams} from "@angular/common/http";
import {PersonDto} from "../../dto/gbdfl-person-dto";
import {ExaminationDirectionDto} from "../../dto/examination-direction-dto";
import {ExpertOpinionRequest} from "../model/expertopinion-dto";
import {FaceDataDto} from "../model/face-data";
import {FaceDataResponseDto} from "../model/face-data-response";

@Injectable({providedIn: 'root'})
export class FaceService {
    constructor(private api: ApiService) {
    }

    signWithPhoto(faceData: FaceDataDto): Observable<FaceDataResponseDto> {
        return this.api.post(`/api/face-service/sign-with-face`, faceData);
    }

}
