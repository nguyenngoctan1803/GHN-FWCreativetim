import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private loggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());

  constructor(
    private cookieService: StorageService
  ) { }

  // Observable để các component khác có thể subscribe vào
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // Phương thức để cập nhật trạng thái đăng nhập
  login() {
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
  }
    // Kiểm tra trạng thái đăng nhập dựa trên giá trị của cookie
  private checkLoginStatus(): boolean {
    const token = this.cookieService.getCookie(environment.tokenKhachHang);
    return token !== null; // Hoặc thêm logic kiểm tra token hợp lệ
  }
}
