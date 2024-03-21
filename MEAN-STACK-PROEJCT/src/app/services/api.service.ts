import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../types/Options';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  
  constructor(private httpClient: HttpClient) { }

  get<T>(url: string, options: Options): Observable<T> {
    console.log("1")
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }
}
