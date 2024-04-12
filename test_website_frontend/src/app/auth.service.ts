import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = '//localhost:8000/auth';

  isLoggedIn: boolean = false;
  username: string | null = null;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.checkLoggedInStatus().subscribe({
      next: (response) => {
        console.log(response);
        if (response.logged_in && response.username) {
          this.isLoggedIn = true;
          this.username = response.username;
        }
      },
      error: (e) => console.error(e)
    });
  }

  login(username: string, password: string) {
    return this.http.post<LoggedInResponse>(`${this.authUrl}/login/`, { username, password }, this.setHeaders()).pipe(
      tap(response => {
        if (response.username) {
          this.username = response.username;
          this.isLoggedIn = true;
        }
      }),
      catchError(this.handleError)
    );
  }

  register(username: string, email: string, password: string) {
    return this.http.post<LoggedInResponse>(`${this.authUrl}/register/`, { username, email, password }, this.setHeaders()).pipe(
      tap(response => {
        if (response.username) {
          this.username = response.username;
          this.isLoggedIn = true;
        }
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    this.isLoggedIn = false;
    this.username = null;
    return this.http.post(`${this.authUrl}/logout/`, {}, this.setHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  private checkLoggedInStatus() {
    return this.http.get<LoggedInResponse>(`${this.authUrl}/logged_in/`, this.setHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  private setHeaders() {
    let csrf = this.cookieService.get("csrftoken");
    
    if (typeof(csrf) === 'undefined') {
      csrf = '';
    }
    
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf
      }),
      withCredentials : true
    };
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

export interface LoggedInResponse {
  logged_in?: boolean;
  username?: string;
}