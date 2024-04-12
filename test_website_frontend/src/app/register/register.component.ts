import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  register(username: string, email: string, password: string) {
    this.authService.register(username, email, password).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/']);
      },
      error: (e) => console.error(e)
    });
  }
}