import { Component ,OnInit,inject } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { error } from 'console';
import {jwtDecode} from 'jwt-decode'








@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
 

  

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
      next:(response) =>{
        const message = response.message.toString();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            confirmButtonText: 'OK'
          });
          const token = response.token;

        localStorage.setItem('token', token);
        console.log(token);
        this.router.navigate(['home'])
      },error(error: HttpErrorResponse){
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: "Login failed",
          confirmButtonText: 'OK'
        })
      }
    })
  }

 
  
}


