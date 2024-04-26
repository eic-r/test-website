import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private apiUrl = '//localhost:8000/api';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  putTests(tensileEntries: any[], shearEntries: any[], thermalEntries: any[], otherEntries: any[]) {
    return this.http.put(`${this.apiUrl}/put_tests/`, {
      'tensile' : tensileEntries,
      'shear' : shearEntries,
      'thermalConductivity' : thermalEntries,
      'other' : otherEntries
    }, this.setHeaders()).pipe(
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
