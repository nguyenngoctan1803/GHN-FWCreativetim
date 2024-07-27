import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, EmailValidator, Validators} from '@angular/forms';
import { CustomerService } from 'app/public/service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';
import { StorageService } from 'app/shared/service/storage.service';
import { SubjectService } from 'app/shared/service/subject.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  test : Date = new Date();
  focus;
  focus1;

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router:Router, 
    private customerService: CustomerService,
    private toastr: ToastrService,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
    this.subjectService.isLoggedIn.subscribe(loggedIn => {
      if(loggedIn){
        this.router.navigate(['/public/home']);
      } 
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      let formData = this.signinForm.value;
      let payload = {
        email: formData.email,
        matKhau: formData.password
      }
      this.customerService.login(payload).subscribe(
        response => {
          this.customerService.loginSuccess(response);
          this.subjectService.login();

          this.toastr.success('Đăng nhập thành công','Thông báo'); 
          this.router.navigate(['/public/home']);
        },
        error => {
          this.toastr.error('Đăng nhập không thành công','Thông báo');
          console.error('There was an error!', error);
        }
      );
    } else {
      this.toastr.error('Thông tin đăng nhập không hợp lệ!','Thông báo');
    }
  }
  
}
