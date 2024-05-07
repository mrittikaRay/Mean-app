import { Component, OnInit  } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  cartCount: number = 0;

  constructor(private cartService: CartService) {}

  
  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
}
