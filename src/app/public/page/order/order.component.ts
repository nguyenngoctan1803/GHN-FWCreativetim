import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'app/public/service/customer.service';
import { MapService } from 'app/public/service/map.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  data: any[] = [];
  dataWaitConfirm: any[] = [];
  dataProcess: any[] = [];
  dataSuccess: any[] = [];
  dataCancel: any[] = [];
  dataRefund: any[] = [];
  @ViewChild('detailModal') detailModal: any;
  @ViewChild('cancelModal') cancelModal: any;
  scrollbarConfig: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    minScrollbarLength: 20,
    wheelSpeed: 0.2,
    swipeEasing: true
  };
  searchControl = new FormControl();
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.searchControl.valueChanges
    .pipe(
      debounceTime(2000) // Chờ 300ms sau khi người dùng ngừng nhập
    )
    .subscribe(value => {
      this.loadData(value);
    });
    this.loadData();
  }

  loadData(search = '') {
    this.customerService.getListOrder(search).subscribe(
      response => {
        this.data = response as any[];
        this.dataWaitConfirm = this.data.filter(d => d.trangThaiID == 1);
        this.dataProcess = this.data.filter(d => d.trangThaiID == 2 || d.trangThaiID == 3 || d.trangThaiID == 5);
        this.dataSuccess = this.data.filter(d => d.trangThaiID == 4);
        this.dataCancel = this.data.filter(d => d.trangThaiID == 8);
        this.dataRefund = this.data.filter(d => d.trangThaiID == 6);
      },
      error => {
        this.data = [];
        this.toastr.error('Lấy danh sách đơn hàng không thành công', 'Thông báo');
        console.error('There was an error!', error);
      }
    );
  }
  // detail
  openDetailModal(id) {
    this.detailModal.openDetailModal(id);
  }
  // cancel
  openCancelModal(id) {
    this.cancelModal.openCancelModal(id);
  }
  cancelOrder($event){
    this.customerService.cancelOrder($event).subscribe(
      response => {
        this.toastr.success('Hủy đơn hàng thành công', 'Thông báo');
        this.loadData();
      },
      error => {
        this.toastr.error('Hủy đơn hàng không thành công', 'Thông báo');
        console.error('There was an error!', error);
      }
    )
  }
}
