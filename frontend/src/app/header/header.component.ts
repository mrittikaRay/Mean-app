import { Component, OnInit, inject ,OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  userId : any
  
  cartData : any = []

  constructor(private cartService : CartService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}
  

  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('user._id');

   } 
    this.cartCountSubscription = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.cartService.fetchDataAndUpdateCount();
  } 

  ngOnDestroy(): void {
    this.cartCountSubscription.unsubscribe();
  }

 



 }

  

