import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) { }

  fetchDataAndUpdateCount(): void {
    // this.http.get<any[]>('http://localhost:3000/cart')
    //   .subscribe({
    //     next: (data) => {
    //       const allProducts = data.flatMap(cartItem => cartItem.products);
    //       const cartData = allProducts.map(item => ({
    //         product: item.product,
    //         quantity: item.quantity,
    //       }));

    //       const cartCount = cartData.reduce((total: number, product: any) => {
    //         return total + (product.quantity || 0); 
    //       }, 0);

    //       this.updateCartCount(cartCount);
    //     },
    //     error: (error) => {
    //       console.error('Error fetching cart data:', error);
    //     }
    //   });
  }

  updateCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }

  getCartCount(): number {
    return this.cartCountSubject.value;
  }
}
