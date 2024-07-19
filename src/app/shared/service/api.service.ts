import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl; // Thay đổi URL này thành API của bạn

  constructor(private http: HttpClient) { }

  // GET
  get<T>(endpoint: string, params?: any): Observable<T> {
    let queryParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        queryParams = queryParams.append(key, params[key]);
      });
    }
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params: queryParams }).pipe(
      catchError(this.handleError)
    );
  }

  // POST
  post(endpoint: string, body: any, options?: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, body, {headers: this.createHeaders()}).pipe(
      catchError(this.handleError)
    );
  }

  // PUT
  put(endpoint: string, body: any, options?: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, body, options);
  }

  // DELETE
  delete(endpoint: string, options?: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`, options).pipe(
      catchError(this.handleError)
    );
  }

 // Error handling
 private handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Client-side errors
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side errors
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}

  // Custom headers example
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your-token' // Thay đổi token nếu cần
    });
  }
}
