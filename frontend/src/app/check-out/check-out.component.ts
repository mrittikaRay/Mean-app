import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


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
  productsData: any = [];

  ngOnInit(): void {
    
    this.fetchData();

  }

  fetchData(): void {
    this.httpclient.get<any[]>('http://localhost:3000/cart')
      .subscribe((data) => {
          console.log(data);
          this.productsData = data.flatMap(cartItem => cartItem.products);
        },
        
      );
  }
}
