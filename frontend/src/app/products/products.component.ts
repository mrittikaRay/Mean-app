import { Component, OnInit, inject,Output , EventEmitter} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
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



  constructor(
    private router: Router,
    private cartService: CartService
  ) {}
  

  ngOnInit(): void {
      this.fetchData();
  }

  fetchData(){
    this.httpclient
    .get('http://localhost:3000/products')
    .subscribe((data) =>{
      console.log(data);
      this.data = data;

    });
  }


  addToCart(event:Event,productId: string): void {
    event.preventDefault();
    this.httpclient.post<any>(`http://localhost:3000/cart/add/${productId}`, {})
      .subscribe((response) => {
          console.log(response);
          const message = response.message.toString();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            confirmButtonText: 'OK'
          });
          this.fetchData(); 
          // this.cartService.addToCart(productId);

        },
      );
  }
  

 
  goToProductDetails(event: Event,productId: string) {
    event.preventDefault();
    this.router.navigate(['/products',productId]);
  }
  
}

// exports: [RouterModule]


