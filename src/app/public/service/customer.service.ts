import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/shared/service/api.service';
import { StorageService } from 'app/shared/service/storage.service';
import { environment } from 'environments/environment';
import { map } from 'rxjs';


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
    this.cookieService.clearCookie();
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
    return this.apiService.post('KhachHang/tao-don-hang', body);
  }

  getListOrder(search = ''){
    let idKh = this.cookieService.getCookie(environment.idKhachHang);
    return this.apiService.get(`KhachHang/don-hang/${idKh}?search=${search}`);
  }
  getOrderById(id){
    return this.apiService.get(`DonHang/${id}`);
  }
  getDetailOrderByOrderId(orderId){
    return this.apiService.get(`Donhang/chitietdonhang/${orderId}`);
  }
  getDetailCustomerByCusId(khId){
    return this.apiService.get(`Khachhang/${khId}`);
  }
  getDetailShipperByCusId(id){
    return this.apiService.get(`Shipper/${id}`);
  }
  getReasonOrderByOrderId(orderId){
    return this.apiService.get(`Donhang/lydohoanhang/${orderId}`);
  }
  cancelOrder(orderId){
    return this.apiService.post(`Donhang/huydonhang/${orderId}`, {});
  }
  //
  updateCustomer(body){
    return this.apiService.put(`KhachHang/update`, body);
  }
  changePassword(body){
    return this.apiService.put(`KhachHang/changepassword`, body);
  }

}
