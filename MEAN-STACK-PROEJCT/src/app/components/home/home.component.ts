import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../../types/Products';
import { Product } from '../../../types/Product';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products: Product[] = [];

  totalRecords: number = 0;

  rows: number = 5;

  constructor(
    private productsService: ProductsService
  ){}

  fetchProducts(page: number, perPage: number) {
    this.productsService
    .getProducts('http://localhost:3000/clothes', {page, perPage})
    .subscribe((products: Products) => {
      this.products = products.items;
      this.totalRecords = products.total;
    })
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows)
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows)
  }
}
