import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  emptyName: boolean = false;
  emptyEmail: boolean = false;
  emptyPassword: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signUp(e: Event): void {
    e.preventDefault();
    this.emptyName     = this.form.controls['userName'].hasError('required');
    this.emptyEmail    = this.form.controls['userEmail'].hasError('required');
    this.emptyPassword = this.form.controls['password'].hasError('required');

    if (this.form.valid) {
      this.authService.signUp(this.form.value).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.message,
          });
          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
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
              text: 'Username, email, and password are required.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Internal server error',
            });
          }
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill in all the required fields correctly.',
      });
    }
  }
}
