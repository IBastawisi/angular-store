import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CartItem, Product } from './models/Product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private Http: HttpClient) { }

  cartItems: CartItem[] = [];

  /** GET all products **/
  getProducts() {
    return this.Http.get<Product[]>('assets/data.json');
  }

  /** GET product by id.*/
  getProduct(id: number) {
    return this.getProducts().pipe(map(result => result.find((product) => product.id === id)))
  }

  /** add a product to cart */
  addToCart(product: Product, quantity: number) {
    let cartItem = this.cartItems.find((item) => item.product.id === product.id);
    if (cartItem) {
      this.updateItemQuantity(product.id, quantity)
    } else {
      this.cartItems.push({ product, quantity });
    }
    return this.cartItems;
  }

  updateItemQuantity(id: number, quantity: number) {
    let cartItem = this.cartItems.find((item) => item.product.id === id);
    if (cartItem) {
      cartItem.quantity = quantity;
      if (quantity === 0) this.removeFromCart(id);
    }
    return this.cartItems;
  }

  /** remove product from cart **/
  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter((item) => item.product.id !== id);
    return this.cartItems;
  }

  /** get all cart items **/
  getCartItems() {
    return this.cartItems;
  }

  /** clear cart **/
  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }
}
