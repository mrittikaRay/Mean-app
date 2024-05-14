import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';


interface CartItem {
  productName: string;
  productType: string;
  price: number;
  description: string;
  imageUrl: string;
  available: boolean;
  _id: string;
  totalPrice: number;
  quantityUpdated: boolean;
}

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [HttpClientModule,CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit{
  httpclient = inject(HttpClient);
  cartTotal: number = 0;
  cartData: any= [];
  totalPrice: number = 0;
  userId : any

  constructor(private route: ActivatedRoute,private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,

  ) {}


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('user._id');
      console.log('User ID:', this.userId);

   }
    this.fetchData();

  }

  fetchData(): void {
    this.httpclient.get<any[]>(`http://localhost:3000/cart/${this.userId}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          const allProducts = data.flatMap(cartItem => cartItem.products);
          console.log(allProducts);

          this.cartData = allProducts.map(item => ({
            product: item.product,
            quantity: item.quantity,
            totalValue: item.quantity * item.product.price,
          }));
          this.updateProductTotalPrice()

        },
        error: (error) => {
          console.error('Error fetching cart data:', error);
        }
      });
}
updateProductTotalPrice(): void {
  this.cartTotal = this.cartData.reduce((total: number, product: any) => {
    return total + (product.totalValue || 0); 
  }, 0);
  console.log('Total cart price:', this.cartTotal);
}

  goToInvoice(): void {
    
    this.router.navigateByUrl('/invoice', { skipLocationChange: true });
  }

  
}
