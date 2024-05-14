import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit ,PLATFORM_ID,inject} from '@angular/core';;
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit{
  httpclient = inject(HttpClient);
  router = inject(Router)
  invoiceData: any = [];
  totalPrice: number = 0;

  currentDate: Date;
  userId : any;

  constructor(   
     @Inject(PLATFORM_ID) private platformId: Object,

  ) {
    this.currentDate = new Date();

  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('user._id');
      console.log('User ID:', this.userId);

   }
    this.fetchOrderDetails();
    this.router.resetConfig([{ path: '', redirectTo: 'invoice', pathMatch: 'full' }]);

  }

 

  fetchOrderDetails() : void{
    
    this.httpclient.get<any[]>(`http://localhost:3000/cart/${this.userId}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          const allProducts = data.flatMap(cartItem => cartItem.products);
          console.log(allProducts);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Invoice generated successfully",
            showConfirmButton: false,
            timer: 2000,
            iconColor: 'darkcyan'
          })

          this.invoiceData = allProducts.map(item => ({
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

  updateProductTotalPrice(){
    this.totalPrice = this.invoiceData.reduce((total: Number, product: any) =>{
      return total + (product.totalValue || 0);
    }, 0)
  }

}
