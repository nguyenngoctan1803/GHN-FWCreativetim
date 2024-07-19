import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'app/public/service/customer.service';
import { StorageService } from 'app/shared/service/storage.service';
import { SubjectService } from 'app/shared/service/subject.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  orderForm: FormGroup;

  constructor(
    private router:Router, 
    private customerService: CustomerService,
    private toastr: ToastrService,
    private cokieService: StorageService,
    private subjectService: SubjectService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.orderForm = this.fb.group({
      khachHangID: [0, Validators.required],
      diaChiNhanHang: ['', Validators.required],
      diaChiGiaoHang: ['', Validators.required],
      soDienThoaiNguoiNhan: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      soDienThoaiNguoiGui: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      chiTietDonHang: this.fb.array([this.createChiTietDonHang()])
    });
  }

  // Tạo FormGroup cho chiTietDonHang
  createChiTietDonHang(): FormGroup {
    return this.fb.group({
      tenHangHoa: ['', Validators.required],
      tienThuHoCOD: [0, Validators.required],
      khoiLuong: [0, Validators.required]
    });
  }

  // Trả về FormArray của chiTietDonHang
  get chiTietDonHang(): FormArray {
    return this.orderForm.get('chiTietDonHang') as FormArray;
  }

  // Thêm chi tiết đơn hàng mới vào FormArray
  addChiTietDonHang() {
    this.chiTietDonHang.push(this.createChiTietDonHang());
  }

  // Xóa chi tiết đơn hàng khỏi FormArray
  removeChiTietDonHang(index: number) {
    this.chiTietDonHang.removeAt(index);
  }
  
  onSubmit() {
    if (this.orderForm.valid) {
      let payload = this.orderForm.value;
      console.log(payload);
      this.customerService.order(payload).subscribe(
        response => {
          this.toastr.success('Tạo đơn hàng thành công','Thông báo'); 
          this.router.navigate(['/public/home']);
        },
        error => {
          this.toastr.error('Tạo đơn hàng không thành công','Thông báo');
          console.error('There was an error!', error);
        }
      );
    } else {
      this.toastr.error('Thông tin đơn hàng không hợp lệ!','Thông báo');
    }
  }
}
