import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartCount: number = 0;
  private cartCountSubscription!: Subscription;
  userId: any;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('user._id');
    }

    // Subscribe to cart count changes
    this.cartCountSubscription = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    // Fetch initial cart count
    this.cartService.fetchDataAndUpdateCount();
  }

  ngOnDestroy(): void {
    // Unsubscribe from cart count changes to prevent memory leaks
    this.cartCountSubscription.unsubscribe();
  }

  logOut(): void {
    this.authService.signOut().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
