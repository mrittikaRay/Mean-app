import { Component, OnInit ,inject} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';



interface CartData {
  _id: string;
  productName: string;
  productType: string;
  price: number;
  description: string;
  imageUrl: string;
  available: boolean;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,HttpClientModule,HeaderComponent,FooterComponent,FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  httpclient = inject(HttpClient);
  cartTotal: number = 0;
  productsData: any = [];
  productQuantities: { [productId: string]: number } = {};
  totalPrice?: number;
  quantityUpdated?: boolean;



  constructor(
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    
    this.fetchData();


  }

  fetchData(): void {

    this.httpclient.get<any[]>('http://localhost:3000/cart')
      .subscribe((data) => {
          console.log(data);
          this.productsData = data.flatMap(cartItem => cartItem.products);
          console.log(this.productsData);
          
          // this.calculateTotal();
        },
        
      );
  }

  removeFromCart(productId: any): void {
    if (!productId) {
      console.error('Product ID is undefined');
      return;
    }
    this.httpclient.delete('http://localhost:3000/cart/delete/' + productId)
      .subscribe(
        (response) => {
          console.log(response);
          this.fetchData(); 
        },
        
      );
  }

  increaseQuantity(productId: string): void {
    if (!this.productQuantities[productId]) {
      this.productQuantities[productId] = 1; 
    } else {
      this.productQuantities[productId]++;   
      console.log(this.productQuantities[productId]);
    }
    this.updateProductTotalPrice(productId);
    this.setQuantityUpdated(productId, true); 
  }

  decreaseQuantity(productId: string): void { 
    const currentQuantity = this.getQuantity(productId);
    if (currentQuantity > 1) {
      this.productQuantities[productId]--; 
      console.log(this.productQuantities[productId]);
       this.productQuantities[productId]
    }
    this.updateProductTotalPrice(productId);
    this.setQuantityUpdated(productId, true); 
  }
 
  getQuantity(productId: any): number {    
    return this.productQuantities[productId] || 1; 
  }

  updateProductTotalPrice(productId: string): void {
    const product = this.productsData.find((p: any) => p._id === productId);
    if (product) {
      product.totalPrice = product.price * this.productQuantities[productId];
      console.log(`Total price for product ${productId}: ${product.totalPrice}`);
    }
  }

  setQuantityUpdated(productId: string, value: boolean): void {
    const product = this.productsData.find((p:any) => p._id === productId);
    if (product) {
      product.quantityUpdated = value; 
    }
  }
  
  


  


  // calculateTotal(): void {
  //   this.cartTotal = this.productsData.products.reduce((total: number, product: any) => {
  //     return total + product.price;
  //   }, 0);
  // }
  
  
  
  
  
  
}
