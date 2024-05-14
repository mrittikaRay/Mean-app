import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
userId : any
  constructor(    @Inject(PLATFORM_ID) private platformId: Object,
){

  }
  ngOnInit(): void {
 if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('user._id');

   } 
   }

}
