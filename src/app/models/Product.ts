export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  url: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}