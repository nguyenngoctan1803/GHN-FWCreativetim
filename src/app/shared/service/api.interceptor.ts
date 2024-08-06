import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import { SubjectService } from './subject.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: StorageService,
    private subjectService: SubjectService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Clone the request to add the new headers
    const token = this.cookieService.getCookie(environment.tokenKhachHang);
    const clonedRequest = request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
    });
    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          // Navigate to the login page
          this.cookieService.clearCookie();
          this.subjectService.logout();
          this.router.navigate(['/login']);
        }
        if (error.status ===  HttpStatusCode.InternalServerError) {
          // Navigate to the login page
          
        }
        return throwError(error);
      })
    );
  }
}
