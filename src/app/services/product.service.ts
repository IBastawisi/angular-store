import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from '../models/Product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private Http: HttpClient) { }

  /** GET all products **/
  getProducts() {
    return this.Http.get<Product[]>('assets/data.json');
  }

  /** GET product by id.*/
  getProduct(id: number) {
    return this.getProducts().pipe(map(result => result.find((product) => product.id === id)))
  }
}
