import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {PersonDto} from "../../dto/gbdfl-person-dto";
import {ApiService} from "../api.service";

@Injectable({ providedIn: 'root' })
export class PersonService {
    constructor(private api: ApiService) {}

    getById(id: number): Observable<PersonDto> {
        return this.api.get<PersonDto>(`/api/person/${id}`);
    }

    getPersonHistory(id: number): Observable<any> {
      return this.api.get(`/api/person/history/${id}`);
    }
}
