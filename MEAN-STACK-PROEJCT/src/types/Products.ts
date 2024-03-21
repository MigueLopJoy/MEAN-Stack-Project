import { Product } from "./Product";

export interface Products {
    items: Product[];
    total: number;
    page:number;
    perPage:number;
    totalPages:number;
}