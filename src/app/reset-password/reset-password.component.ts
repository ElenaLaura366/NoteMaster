import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.resetForm.invalid) return;
  
    const { email, newPassword } = this.resetForm.value;
  
    this.http.post<any>('http://localhost:5000/api/auth/reset-password', {
      email,
      newPassword
    }).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.errorMessage = null;
        this.resetForm.reset();
      },
      error: (err) => {
        this.successMessage = null;
  
        if (err.status === 404) {
          this.errorMessage = "Utilizatorul nu a fost găsit.";
        } else if (err.status === 409) {
          this.errorMessage = "Noua parolă nu poate fi aceeași cu parola veche.";
        } else {
          this.errorMessage = err.error.message || "A apărut o eroare.";
        }
      }
    });
  }
  
  goBack() {
    this.router.navigate(['/login']);
  }
}
