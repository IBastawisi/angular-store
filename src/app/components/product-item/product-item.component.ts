import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/product.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  @Input() variant: 'main' | 'detailed' | 'cart' = 'main';
  @Input() product?: Product;
  @Input() quantity = 1;
  @Output() quantityChange = new EventEmitter<{ id: number, quantity: number }>();

  constructor(private service: ProductService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    if (!this.product) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.service.getProduct(id).subscribe((product) => this.product = product);
    }
    this.route.data.subscribe(data => {
      this.variant = data['variant'] || this.variant;
    })
  }

  addToCart() {
    if (!this.product) return;
    this.service.addToCart(this.product, +this.quantity);
    alert(`${this.quantity} of ${this.product.name} was added to cart`);
  }

  updateQuantity() {
    if(!this.product) return;
    this.quantityChange.emit({ id: this.product.id, quantity: this.quantity });
  }

  goBack(): void {
    this.location.back();
  }
}
