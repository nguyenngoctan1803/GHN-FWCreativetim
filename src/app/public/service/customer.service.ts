import { Injectable } from '@angular/core';
import { ApiService } from 'app/shared/service/api.service';
import { StorageService } from 'app/shared/service/storage.service';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    public apiService: ApiService,
    private cookieService: StorageService
  ) { }
  
  login(body: any){
    return this.apiService.post('KhachHang/login', body);
  }

  register(body: any){
    return this.apiService.post('KhachHang/register', body);
  }

  loginSuccess(data){
    this.cookieService.setCookie(environment.tokenKhachHang, data.token);
    this.cookieService.setCookie(environment.idKhachHang, data.id);
    this.cookieService.setCookie(environment.khachHang, JSON.stringify(data));
  }

  logout(){
    this.cookieService.deleteCookie(environment.tokenKhachHang);
    this.cookieService.deleteCookie(environment.idKhachHang);
    this.cookieService.deleteCookie(environment.khachHang);
  }

  //order
  order(body: any){
    let idKh = this.cookieService.getCookie(environment.idKhachHang);
    body.khachHangID = idKh;
    console.log(body);
    return this.apiService.post('KhachHang/tao-don-hang', body);
  }
}
