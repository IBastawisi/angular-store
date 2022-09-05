import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/models/Cart';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  constructor() { }

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
