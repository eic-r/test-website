import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/']);
      },
      error: (e) => console.error(e) // handle failure state
    });
  }
}
