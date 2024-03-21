import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams } from '../../types/PaginationParams';
import { Products } from '../../types/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: APIService) { }
  
  getProducts = (url:string, params: PaginationParams): Observable<Products> => {
    console.log("2")
    return this.apiService.get(url, {
      params,
      responseType: 'json'
    })
  }
}
