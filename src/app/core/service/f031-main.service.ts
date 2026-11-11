import {Injectable} from "@angular/core";
import {ApiService} from "../api.service";

@Injectable({providedIn: 'root'})
export class F031MainService {

  constructor(private api: ApiService) {
  }

  getActualF031MainId(iin: string) {
    return this.api.get<number>(`/api/f031/actual/${iin}`);
  }

}
