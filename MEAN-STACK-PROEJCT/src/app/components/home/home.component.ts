import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../../types/Products';
import { Product } from '../../../types/Product';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;
  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;
  selectedProduct: Product = {
    id: 0,
    price: '',
    name: '',
    image:'',
    rating: 0
  }

  constructor(
    private productsService: ProductsService
  ){}

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = !this.displayEditPopup;
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  toggleDeletePopup(product: Product) {
    
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
    .getProducts('http://localhost:3000/clothes', {page, perPage})
    .subscribe(
      {
        next: (products: Products) => {
          this.products = products.items;
          this.totalRecords = products.total;
        },
        error: (error) => console.log(error)
      }
    )
  }

  addProduct(product: Product) {
    this.productsService.editProduct(`http://localhost:3000/clothes/`, product).subscribe(
      {
        next: (data) => {
          console.log(data)
          this.fetchProducts(0, this.rows)
        },
        error: (error) => console.log(error)
      }
    )
  }

  editProduct(product: Product, id:number) {
    this.productsService.editProduct(`http://localhost:3000/clothes/${id}`, product).subscribe(
      {
        next: (data) => {
          console.log(data)
          this.fetchProducts(0, this.rows)
        },
        error: (error) => console.log(error)
      }
    )
  }

  deleteProduct(product: Product, id:number) {
    this.productsService.editProduct(`http://localhost:3000/clothes/${id}`, product).subscribe(
      {
        next: (data) => {
          console.log(data)
          this.fetchProducts(0, this.rows)
        },        
        error: (error) => console.log(error)
      }
    )
  }

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) return

    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayEditPopup = false;
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows)
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows)
  }
}
