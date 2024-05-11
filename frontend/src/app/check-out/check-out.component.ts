import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

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
  items: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private route: ActivatedRoute,private router: Router) {}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.items = JSON.parse(params['items']);
      this.calculateTotalPrice();
    });

  }

  calculateTotalPrice(): void {
    this.totalPrice = this.items.reduce((total, item) => total + item.totalPrice, 0);
  }

  goToInvoice(): void {
    this.router.navigate(['/invoice'], {
      queryParams: {
        items: JSON.stringify(this.items),
        totalPrice: this.totalPrice
      }
    });
  }

  
}
