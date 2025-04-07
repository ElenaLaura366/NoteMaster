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
          // Resetezi eventualele mesaje de eroare
          this.nameError = null;
          this.passwordError = null;
          this.router.navigate(['/student-profile']);
        },
        error: (error) => {
          console.error('Login failed', error);

          // Verifici status-ul pentru a afișa mesajele specifice
          if (error.status === 404) {
            // utilizator inexistent
            this.nameError = 'Numele de utilizator nu a fost găsit.';
            this.passwordError = null;
          } else if (error.status === 401) {
            // parolă greșită
            this.passwordError = 'Parola introdusă este incorectă.';
            this.nameError = null;
          } else {
            // alt tip de eroare
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
