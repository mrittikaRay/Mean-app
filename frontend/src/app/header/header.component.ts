import { Component, OnInit, inject ,OnDestroy } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  cartCount!: number;
  private cartCountSubscription!: Subscription;
  httpclient = inject(HttpClient);
  cartData : any = []

  constructor(private cartService : CartService) {}
  ngOnDestroy(): void {
    this.cartCountSubscription.unsubscribe();
  }

  
  ngOnInit(): void {
    this.cartCountSubscription = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.cartService.fetchDataAndUpdateCount();
  } 

  fetchData(): void {
    this.httpclient.get<any[]>('http://localhost:3000/cart')
      .subscribe({
        next: (data) => {
          console.log(data);
          const allProducts = data.flatMap(cartItem => cartItem.products);
          console.log(allProducts);

          this.cartData = allProducts.map(item => ({
            product: item.product,
            quantity: item.quantity,
          }));
          this.updateProductTotalPrice();
          console.log();
          
        },
        error: (error) => {
          console.error('Error fetching cart data:', error);
        }
      });
    };


updateProductTotalPrice(): void {
  this.cartCount = this.cartData.reduce((total: number, product: any) => {
    return total + (product.quantity || 0); 
  }, 0);
  console.log( this.cartCount);
}
 }

  

