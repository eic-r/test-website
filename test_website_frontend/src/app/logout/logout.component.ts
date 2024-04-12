import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private authService: AuthService) {
    authService.logout().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (e) => console.error(e)
    });
  }
}
