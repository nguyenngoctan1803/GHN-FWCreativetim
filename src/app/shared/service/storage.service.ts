import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  
   // Cookie Methods
   setCookie(name: string, value: string, hours: number = 1): void {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }
  
  getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  // Lấy giá trị từ chuỗi JSON trong cookie
  getJsonPropertyFromCookie(cookieName: string, propertyName: string): any {
    const cookieValue = this.getCookie(cookieName);
    if (cookieValue) {
      try {
        const jsonObject = JSON.parse(cookieValue);
        return jsonObject[propertyName];
      } catch (e) {
        console.error('Error parsing JSON from cookie', e);
        return null;
      }
    }
    return null;
  }
  deleteCookie(name: string): void {
    this.setCookie(name, '', -1);
  }
  // Xóa tất cả các cookie
  clearCookie(): void {
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      this.deleteCookie(name.trim());
    }
  }

  // LocalStorage Methods
  setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
