import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { CustomerService } from "app/public/service/customer.service";
import { StorageService } from "app/shared/service/storage.service";
import { SubjectService } from "app/shared/service/subject.service";
import { environment } from "environments/environment";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  data: any;
  //approve
  @ViewChild("updateModal") updateModal: any;
  @ViewChild("changepassModal") changepassModal: any;

  constructor(
    private storageService: StorageService,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private subjectService: SubjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.data = JSON.parse(
      this.storageService.getCookie(environment.khachHang)
    );
  }
  // update
  openUpdateModal() {
    this.updateModal.openUpdateModal({ ...this.data });
  }

  confirmUpdate($event) {
    console.log($event);
    this.customerService.updateCustomer($event).subscribe(
      (response) => {
        this.toastr.success("Sửa thông tin cá nhận thành công", "Thông báo");
        this.changeInfoCookie($event);
      },
      (error) => {
        this.toastr.error(
          "Sửa thông tin cá nhận không thành công",
          "Thông báo"
        );
        console.error("There was an error!", error);
      }
    );
  }
  changeInfoCookie(data) {
    this.data.hoTen = data.hoTen;
    this.data.email = data.email;
    this.storageService.setCookie(
      environment.khachHang,
      JSON.stringify(this.data)
    );
    location.reload();
  }

  // changpassword
  openChangePasswordModal() {
    this.changepassModal.openChangePasswordModal({ ...this.data });
  }

  confirmChangePassword($event) {
    this.customerService.changePassword($event).subscribe(
      (response) => {
        if (response?.message) {
          this.toastr.error(response.message, "Thông báo");
        } else {
          this.toastr.success(
            "Đổi mật khẩu thành công thành công",
            "Thông báo"
          );
          this.toastr.warning("Vui lòng đăng nhập lại", "Thông báo");
          this.customerService.logout();
          this.subjectService.logout();
          this.router.navigateByUrl("/public/signin");
        }
      },
      (error) => {
        this.toastr.error("Đổi mật khẩu không thành công", "Thông báo");
        console.error("There was an error!", error);
      }
    );
  }
}
