import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [RouterOutlet],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  constructor(private router: Router) {}

  personalPage(){
    console.log("Resetare parolă");
    this.router.navigate(['/home']);
  }

}
