import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, password, email } = this.registerForm.value;
      this.authService.register(username!, email!, password!)
        .subscribe({
          next: (response) => {
            console.log('Registration successful', response);
          },
          error: (error) => {
            console.error('Registration failed', error);
          }
        });
    }
    
  }
}
