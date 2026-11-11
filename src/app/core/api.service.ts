import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DictinoryValue} from "../dto/dictinory-value";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'https://test-cbdi-gateway.enbek.kz'; // Базовый URL бэкенда

  constructor(private http: HttpClient) {
  }

  get<T>(path: string, params?: any, headers?: any): Observable<T> {
    return this.http.get<T>(
      `${this.apiUrl}${path}`,
      {
        headers: this.getHeaders(headers),
        params: params
      }
    );
  }

  post<T>(path: string, body: any = {}, headers?: any): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}${path}`,
      body,
      {
        headers: this.getHeaders(headers)
      }
    );
  }

  put<T>(path: string, body: any = {}, headers?: any): Observable<T> {
    return this.http.put<T>(
      `${this.apiUrl}${path}`,
      body,
      {
        headers: this.getHeaders(headers)
      }
    );
  }

  delete<T>(path: string, params?: any, headers?: any): Observable<T> {
    return this.http.delete<T>(
      `${this.apiUrl}${path}`,
      {
        headers: this.getHeaders(headers)
      }
    );
  }

  getByIdFromLocalStorage<T>(id: number, key: string): DictinoryValue {
    const data = localStorage.getItem(key);
    console.log((data));
    const dic: DictinoryValue = <DictinoryValue>{id: 1};
    if (!data) return dic;
    const arr = JSON.parse(data);
    return arr.find((item: any) => item.id === id);
  }

  private getHeaders(customHeaders?: any): HttpHeaders {
    // const token = localStorage.getItem('token');

    let headers = new HttpHeaders({});

    // if (token) {
    //   headers = headers.set('Authorization', `Bearer ${token}`);
    // }

    if (customHeaders) {
      for (const key of Object.keys(customHeaders)) {
        headers = headers.set(key, customHeaders[key]);
      }
    }
    return headers;
  }
}
