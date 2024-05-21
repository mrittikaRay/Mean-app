import { Component, OnInit } from '@angular/core';
import { HeaderComponent }   from '../header/header.component';
import { FooterComponent }   from '../footer/footer.component';
import { CommonModule }      from '@angular/common';
import { HttpClientModule }  from '@angular/common/http';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule, HttpClientModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  
  ngOnInit(): void {
    
  }
  
}
