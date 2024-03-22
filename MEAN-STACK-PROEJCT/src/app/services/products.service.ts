import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams } from '../../types/PaginationParams';
import { Products } from '../../types/Products';
import { Product } from '../../types/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: APIService) { }
  
  getProducts = (url:string, params: PaginationParams): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json'
    })
  }

  addProduct = (url:string, body: Product): Observable<Products> => {
    return this.apiService.post(url, body, {})
  }

  editProduct = (url:string, body: Product): Observable<Products> => {
    return this.apiService.put(url, body, {})
  }

  deleteProduct = (url:string): Observable<Products> => {
    return this.apiService.delete(url, {})
  }
}

