import { Component, OnInit, inject ,PLATFORM_ID,Inject} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule,HeaderComponent,FooterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})


export class ProductsComponent implements OnInit {
  httpclient = inject(HttpClient);
  data : any = [];
  message: string | null = null; 
  userId: any;


  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cartService: CartService
  ) {}


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
       this.userId = localStorage.getItem('user._id');
    }

    this.fetchData();
  }

  fetchData(){
    this.httpclient
    .get('http://localhost:3000/products')
    .subscribe((data) =>{
      console.log(data);
      this.data = data;
      console.log(this.userId);
      
    });
  }


  addToCart(event:Event,productId: string): void {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const userId = this.userId
    if(token){
      this.httpclient.post<any>(`http://localhost:3000/cart/add/${productId}`, {userId})
      .subscribe((response) => {
          console.log(response);
          const message = response.message.toString();
          console.log(this.userId)
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            
          });
          this.fetchData(); 
          const currentCount = this.cartService.getCartCount();
          const newCount = currentCount + 1;
          this.cartService.updateCartCount(newCount);          
        },
      );
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: "session expired login",
        confirmButtonText: 'OK'
      });
      this.router.navigate(['/'])
    }
    
  }



  goToProductDetails(event: Event,productId: string) {
    event.preventDefault();
    this.router.navigate(['/products',productId]);
  }

}