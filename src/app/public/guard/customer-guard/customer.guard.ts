import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { StorageService } from 'app/shared/service/storage.service';

import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(private cookieService: StorageService, private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const cookieValue = this.cookieService.getCookie(environment.tokenKhachHang);
      if (cookieValue) { 
        return true;
      } else {
        this.router.navigate(['/public/signin']);
        return false;
      }
  }
  
}
