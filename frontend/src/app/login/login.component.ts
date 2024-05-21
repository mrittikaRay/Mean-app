import { Component ,OnInit,inject } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  emptyEmail: boolean = false;
  emptyPassword: boolean = false;

  constructor( 
    private router: Router,
    private authservice : AuthService,
    private formbuilder : FormBuilder) { }

  form : FormGroup = this.formbuilder.group({
    userEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  })

  signIn(e: Event){
    e.preventDefault();
    this.emptyEmail    = this.form.controls['userEmail'].hasError('required');
    this.emptyPassword = this.form.controls['password'].hasError('required');

    if(this.form.valid){
      this.authservice.signIn(this.form.value).subscribe({
        next:(response) =>{
          const message = response.message.toString();
            Swal.fire({
              icon : 'success',
              title: 'Success',
              text :  message,
            });

            
            const token = response.token;
            const userId = response.data._id;
            const userName = response.data.userName;
            const userEmail = response.data.userEmail;
  
          localStorage.setItem('token', token);
          localStorage.setItem('user._id', userId);
          localStorage.setItem('userName',userName);
          localStorage.setItem('userEmail', userEmail);
          // console.log(token);
          // console.log(userId);
          // console.log((userName));
          
          if(token){
            this.router.navigate(['home']);
          }

        }, error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'User with this email already exists.',
            });
          } else if (error.status === 404) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'User not found',
            });
          } else if(error.status === 401){
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Incorrect Password',
            });
          } else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Internal Server error',
            });
          }
        }
      });
    }else {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill in all the required fields correctly.',
      });
    }
  }
 
}


