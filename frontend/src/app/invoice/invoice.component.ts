import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit ,inject} from '@angular/core';;
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-invoice',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit{
  items: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.items = JSON.parse(params['items']);
      this.totalPrice = parseFloat(params['totalPrice']);
    });
  }

  // getCurrentDateTime(): any {
  //   const currentDate = new Date();
  //   return this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');
  // }

  

}
