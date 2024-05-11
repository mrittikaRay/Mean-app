import { Component ,OnInit,inject } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { error } from 'console';








@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  // httpclient = inject(HttpClient)
  // email: string = '';
  // password: string = '';
  // errorMessage: string = '';

  

  constructor( 
    private router: Router,
    private authservice : AuthService,
    private formbuilder : FormBuilder) { }

 

  form : FormGroup = this.formbuilder.group({
    userEmail : ['',Validators.required],
    password : ['', Validators.required]
  })

  signIn(e: Event){
    this.authservice.signIn(this.form.value).subscribe({
      next:() =>{
        this.router.navigate(['/'])
      },error(error: HttpErrorResponse){
        console.log(error);
      }
    })
  }

 
  
}


