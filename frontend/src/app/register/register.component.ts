import { Component } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { response } from 'express';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor( 
    private router: Router,
    private authservice : AuthService,
    private formbuilder : FormBuilder) { }

    form : FormGroup = this.formbuilder.group({
      userName  : ['', Validators.required],
      userEmail : ['', Validators.required],
      password  : ['', Validators.required]
    })

    signUp(e: Event){
      this.authservice.signUp(this.form.value).subscribe({
        next:(response) =>{
          const message = response.message.toString();
            Swal.fire({
              icon : 'success',
              title: 'Success',
              text :  message,
            });
            this.router.navigate(['/']);
          
  
        },error(error: HttpErrorResponse){
          const message = error.message.toString();
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: message,
          })
        }
      })
    }
}
