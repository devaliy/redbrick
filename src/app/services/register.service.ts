import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Register } from '../model/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'https://farmas.ng/redbricks/api/api.php';

  constructor(private http: HttpClient) { }

   // Function to create a new student record
   createRegister1(register: Register): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl, register, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



// Function to create a new student record
createRegister(register: Register): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.http.post<any>(this.apiUrl, register, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

// Function to create a new student record
// activate(book: Book): Observable<any> {
//   const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };
//   return this.http.post<any>(this.apiUrl, book, httpOptions)
//     .pipe(
//       catchError(this.handleError)
//     );
// }
// Error handling function
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something went wrong; please try again later.');
  }

}
