import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusTransitionService {

  status:any[] = [
    {
      id: 1,
      name: 'Chờ duyệt',
      class: 'warning'
    },
    {
      id: 2,
      name: 'Đã Duyệt',
      class: 'secondary'
    },
    {
      id: 3,
      name: 'Đang Giao Hàng',
      class: 'info'
    },
    {
      id: 4,
      name: 'Đã Giao',
      class: 'success'
    },
    {
      id: 5,
      name: 'Hoàn hàng đang xử lý',
      class: 'danger'
    },
    {
      id: 6,
      name: 'Hoàn hàng đã hoàn tất',
      class: 'success'
    },
    {
      id: 8,
      name: 'Đã hủy',
      class: 'danger'
    },
  ]
  constructor() { }

  getClassById(id){
    return this.status.find(s => s.id == id)?.class ?? 'info';
  }
  getNameById(id){
    return this.status.find(s => s.id == id)?.name ?? 'Không xác định';
  }
}
