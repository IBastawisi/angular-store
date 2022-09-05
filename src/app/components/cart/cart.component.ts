import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/Product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  fullname?: string;
  address?: string;
  cardNumber?: string;

  constructor(private service: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems = this.service.getCartItems();
  }

  updateQuantity(event: any) {
    const { id, quantity } = event;
    this.cartItems = this.service.updateItemQuantity(id, quantity);
  }

  calculateTotal() {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  onSubmit() {
    alert('Your order has been submitted');
    const confirmProps = { fullname: this.fullname, total: this.calculateTotal() };
    this.cartItems = this.service.clearCart();
    this.router.navigate(['/confirmation'], { state: confirmProps });
  }
}
