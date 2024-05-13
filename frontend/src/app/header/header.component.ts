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
  cartCount: number = 0;
  private cartCountSubscription!: Subscription;
  httpclient = inject(HttpClient);
  cartData : any = []

  constructor(private cartService : CartService) {}
  

  
  ngOnInit(): void {
    this.cartCountSubscription = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.cartService.fetchDataAndUpdateCount();
  } 

  ngOnDestroy(): void {
    this.cartCountSubscription.unsubscribe();
  }

 



 }

  

