import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
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
  selector: 'app-check-out',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,HttpClientModule,CommonModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit{
  httpclient = inject(HttpClient);
  cartTotal: number = 0;
  items: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('Received items:', params['items']);
      console.log('Received quantities:', params['quantities']);
      this.items = JSON.parse(params['items']);
      this.calculateTotalPrice();
    });

  }

  calculateTotalPrice(): void {
    this.totalPrice = this.items.reduce((total, item) => total + item.totalPrice, 0);
  }
}
