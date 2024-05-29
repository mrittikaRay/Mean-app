import { Component, OnInit, inject ,OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  cartCount: number = 0;
  private cartCountSubscription!: Subscription;
  userId : any
  
  cartData : any = []

  constructor(private cartService : CartService,
    private authservice : AuthService,
    private router : Router,
    private httpclient : HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}
  

  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('user._id');
      this.fetchDataAndUpdateCount();

   } 

    this.cartCountSubscription = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    // this.cartService.fetchDataAndUpdateCount();
    console.log(this.cartCount);
    
  } 

  ngOnDestroy(): void {
    this.cartCountSubscription.unsubscribe();
  }
  
  logOut(){
    this.authservice.signOut().subscribe({
      next: (response) =>{
        if(response.clearLocalStorage){
          localStorage.clear();
        }
      this.router.navigate(['/']);
    },
    error: (error) =>{
      console.log(error);
      
    }
  })
  }

  fetchDataAndUpdateCount() {
    
    let userId = this.userId;
    this.httpclient.get<{ cartCount: number }>(`http://localhost:3000/cart-count/${userId}`)
      .subscribe({
        next: (data: { cartCount: any; }) => {
          console.log(data);
          this.cartCount = data.cartCount; 
          console.log(this.cartCount);
        },
        error: (error: any) => {
          console.error('Error fetching cart data:', error);
        }
    });
  }
 



 }
