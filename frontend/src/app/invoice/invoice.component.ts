import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit ,inject} from '@angular/core';;
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit{
  httpclient = inject(HttpClient)
  invoiceData: any = [];
  totalPrice: number = 0;

  currentDate: Date;


  constructor(
  ) {
    this.currentDate = new Date();

  }

  ngOnInit(): void {
    this.fetchOrderDetails()
  }

  // getCurrentDateTime(): any {
  //   const currentDate = new Date();
  //   return this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');
  // }

  fetchOrderDetails() : void{
    this.httpclient.get<any[]>('http://localhost:3000/cart')
      .subscribe({
        next: (data) => {
          console.log(data);
          const allProducts = data.flatMap(cartItem => cartItem.products);
          console.log(allProducts);

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
