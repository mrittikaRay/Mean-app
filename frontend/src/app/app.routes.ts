import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop/shop.component';
import { RegistrationComponent } from './registration/registration.component';
import { CheckOutComponent } from './check-out/check-out.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'products/:productId',
        component: ShopComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },

    {
        path: 'cart',
        component: CartComponent 
    },

    {
        path: 'register',
        component: RegistrationComponent 
    },
    {
        path: 'check-out',
        component: CheckOutComponent 
    },



    

   

    
];
