import { Injectable } from '@angular/core';
import { ApiService } from 'app/shared/service/api.service';
import { StorageService } from 'app/shared/service/storage.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    public apiService: ApiService,
    private cookieService: StorageService
  ) { }
  
  login(body: any){
    return this.apiService.post('Admin/login', body);
  }

  loginSuccess(data){
    this.cookieService.setCookie(environment.tokenAdmin, data.token);
    this.cookieService.setCookie(environment.idAdmin, data.id);
    this.cookieService.setCookie(environment.admin, JSON.stringify(data));
  }

  logout(){
    this.cookieService.deleteCookie(environment.tokenAdmin);
    this.cookieService.deleteCookie(environment.idAdmin);
    this.cookieService.deleteCookie(environment.admin);
  }
}
