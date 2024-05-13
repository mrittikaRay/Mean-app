
import { Component, OnInit,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  httpclient = inject(HttpClient);
  product: any = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router : Router

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['productId'];
      this.showProductDetails(productId);
    });
  }

  showProductDetails(productId: string) {
    this.httpclient
    .get<any>("http://localhost:3000/products/"+`${productId}`)
    .subscribe((data) =>{
      console.log(data);
      this.product = data;
    });
    
  }

 

  addToCart(event:Event,productId: string): void {
    // event.preventDefault();
    // const token = localStorage.getItem('token');
    // if(token){
    //   this.httpclient.post<any>(`http://localhost:3000/cart/add/${productId}`, {})
    //   .subscribe((response) => {
    //       console.log(response);
    //       const message = response.message.toString();
    //       Swal.fire({
    //         icon: 'success',
    //         title: 'Success',
    //         text: message,
    //         confirmButtonText: 'OK'
    //       });
    //       this.showProductDetails(productId); 
    //       this.cartService.fetchDataAndUpdateCount(); 
          
    //     },
    //   );
    // }
    // else{
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'error',
    //     text: "session expired login",
    //     confirmButtonText: 'OK'
    //   });
    //   this.router.navigate(['/'])
    // }
    
  }

  // fetchData(){
  //   this.httpclient
  //   .get('http://localhost:3000/cart')
  //   .subscribe((data) =>{
  //     console.log(data);
  //     this.product = data;
  //   });
  // }

  
}


