import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { inject } from 'vue';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private cartItems: any[] = [];
//   private cartCountSubject = new BehaviorSubject<number>(0);
//   cartCount$ = this.cartCountSubject.asObservable();

//   constructor() {
//     this.loadCartItems();
//     this.updateCartCount(); 
//   }

//   addToCart(product: any): void {
//     this.cartItems.push(product);
//     this.updateCartItems();
//     this.updateCartCount();
//   }

//   removeFromCart(index: number): void {
//     this.cartItems.splice(index, 1);
//     this.updateCartItems();
//     this.updateCartCount();
//   }

//   clearCart(): void {
//     this.cartItems = [];
//     this.updateCartItems();
//     this.updateCartCount();
//   }

//   getCartItems(): any[] {
//     return this.cartItems;
//   }

//   private loadCartItems(): void {
//     const storedCartItems = this.getStoredCartItems();
//     if (storedCartItems) {
//       this.cartItems = storedCartItems;
//     }
//   }

//   private updateCartItems(): void {
//     localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
//     console.log('Cart items updated:', this.cartItems);
//   }

//    updateCartCount(): void {
//     const count = this.cartItems.length;
//     console.log('Updating cart count:', count);
//     this.cartCountSubject.next(count);
//   }

//   private getStoredCartItems(): any[] | null {
//     try {
//       const storedItems = localStorage.getItem('cartItems');
//       return storedItems ? JSON.parse(storedItems) : [];
//     } catch (error) {
//       console.error('Error loading cart items from localStorage:', error);
//       return [];
//     }
//   }
// }

@Injectable({
    providedIn: 'root'
  })
  export class CartService {
    private cartItems: any[] = [];
    private cartCountSubject = new BehaviorSubject<number>(0);
    cartCount$ = this.cartCountSubject.asObservable();
  
    constructor() {
      this.loadCartItems();
      this.updateCartCount(); // Update cart count initially
    }
  
    addToCart(product: any): void {
      this.cartItems.push(product);
      this.updateCartItems();
      this.updateCartCount();
    }
  
    removeFromCart(index: number): void {
      this.cartItems.splice(index, 1);
      this.updateCartItems();
      this.updateCartCount();
    }
  
    clearCart(): void {
      this.cartItems = [];
      this.updateCartItems();
      this.updateCartCount();
    }
  
    getCartItems(): any[] {
      return this.cartItems;
    }

   
  
    private loadCartItems(): void {
      const storedCartItems = this.getStoredCartItems();
      if (storedCartItems) {
        this.cartItems = storedCartItems;
      }
    }
  
    private updateCartItems(): void {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      }
      console.log('Cart items updated:', this.cartItems);
    }
  
    private updateCartCount(): void {
      const count = this.cartItems.length;
      console.log('Updating cart count:', count);
      this.cartCountSubject.next(count);
      console.log(count);
      
    }
  
    private getStoredCartItems(): any[] | null {
      if (typeof localStorage !== 'undefined') {
        try {
          const storedItems = localStorage.getItem('cartItems');
          return storedItems ? JSON.parse(storedItems) : [];
        } catch (error) {
          console.error('Error loading cart items from localStorage:', error);
          return [];
        }
      } else {
        return [];
      }
    }
  }
