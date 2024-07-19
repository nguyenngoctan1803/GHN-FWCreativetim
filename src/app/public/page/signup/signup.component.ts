import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, EmailValidator, Validators} from '@angular/forms';
import { CustomerService } from 'app/public/service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'app/shared/service/storage.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  test : Date = new Date();
  focus;
  focus1;

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ỹ\s]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });


  constructor(
    private router:Router, 
    private customerService: CustomerService,
    private toastr: ToastrService,
    private cokieService: StorageService,
  ) { }

  ngOnInit() {}

  onSubmit() {
    if (this.signupForm.valid) {
      let formData = this.signupForm.value;
      let payload = {
        hoTen: formData.name,
        email: formData.email,
        matKhau: formData.password
      }
      this.customerService.register(payload).subscribe(
        response => {
          this.toastr.success('Vui lòng đăng nhập!','Đăng ký thành công'); 
        },
        error => {
          this.toastr.error('Đăng ký không thành công','Thông báo');
          console.error('There was an error!', error);
        }
      );
    } else {
      this.toastr.error('Thông tin đăng ký không hợp lệ!','Thông báo');
    }
  }

}
