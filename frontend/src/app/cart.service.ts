import { HttpClient } from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCountSubject: BehaviorSubject<number>;
  public cartCount$: Observable<number>; 
  userId: string | null;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    const initialCount = isPlatformBrowser(this.platformId) ? localStorage.getItem('cartCount') : null;
    this.cartCountSubject = new BehaviorSubject<number>(initialCount ? parseInt(initialCount) : 0);
    this.cartCount$ = this.cartCountSubject.asObservable(); 
    
    this.userId = isPlatformBrowser(this.platformId) ? localStorage.getItem('user._id') : null;
  }

  // fetchDataAndUpdateCount(): void {
  //   if (!this.userId) {
  //     console.error('User ID is not available');
  //     return;
  //   }

  //   this.http.get<any[]>(`http://localhost:3000/cart/${this.userId}`)
  //     .subscribe({
  //       next: (data) => {
  //         const allProducts = data.flatMap(cartItem => cartItem.products);
  //         const cartCount = allProducts.reduce((total: number, product: any) => {
  //           return total + (product.quantity || 0); 
  //         }, 0);
  //         this.updateCartCount(cartCount);
  //       },
  //       error: (error) => {
  //         console.error('Error fetching cart data:', error);
  //       }
  //     });
  // }

  updateCartCount(count: number): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cartCount', count.toString());
    }
    this.cartCountSubject.next(count);
  }

  getCartCount(): number {
    return this.cartCountSubject.value;
  }
}