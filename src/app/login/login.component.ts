import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet],
  standalone: true,
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  // Variabile pentru erorile de la server
  nameError: string | null = null;
  passwordError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email!, password!).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.nameError = null;
          this.passwordError = null;
  
          // Redirecționare pe baza adresei de email
          if (email!.endsWith('@student.com')) {
            this.router.navigate(['/student-profile']);
          } else if (email!.endsWith('@teacher.com')) {
            this.router.navigate(['/teacher-profile']);
          } else {
            // fallback: alt domeniu, poți redirecționa către o pagină generică sau dashboard
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          if (error.status === 404) {
            this.nameError = 'Adresa de email nu a fost găsită.';
            this.passwordError = null;
          } else if (error.status === 401) {
            this.passwordError = 'Parola introdusă este incorectă.';
            this.nameError = null;
          } else {
            this.nameError = 'A apărut o eroare, te rugăm să încerci din nou.';
            this.passwordError = null;
          }
        },
      });
    }
  }
  

  onResetPassword() {
    console.log('Navigare către reset-password');
    this.router.navigate(['/reset-password']);
  }
}
