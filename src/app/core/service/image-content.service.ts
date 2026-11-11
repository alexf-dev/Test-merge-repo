import {ImageContentDto} from "../model/image-content-dto";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ApiService} from "../api.service";

@Injectable({
  providedIn: 'root'
})
export class ImageContentService{

  constructor(private http: HttpClient,
              private apiService: ApiService) {}
  getImageContentByPatientId(patientId: number) {
    return this.apiService.get<ImageContentDto[]>(`/api/examination/image/${patientId}`);
  }

  getPdf(id: number) {
    return this.http.get(`https://test-cbdi-gateway.enbek.kz/api/examination/image/pdf/${id}`, {
      responseType: 'blob'
    });
  }
}
