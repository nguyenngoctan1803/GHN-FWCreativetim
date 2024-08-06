import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

   // modal
   @ViewChild('modal') changepassModal: any;
   khachhang: any;  
   @Output() outputEvent = new EventEmitter<any>();
   closeResult: string = '';
   modalRef: NgbModalRef;
   changepassModel = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
 
   constructor(
     private modalService: NgbModal,
     private toastr: ToastrService,
   ) { }
 
   ngOnInit(): void {
 
   }
   openChangePasswordModal(khachhang) {
    this.khachhang = khachhang;
    this.changepassModel.reset();
     this.modalRef = this.modalService.open(this.changepassModal, {
       ariaLabelledBy: 'modal-basic-title',
       size: 'lg',
       windowClass: 'fade', // This ensures the modal window has the fade effect
       backdropClass: 'fade' // This ensures the backdrop has the fade effect
     });
     this.modalRef.result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }
 
   private getDismissReason(reason: any): string {
     switch (reason) {
       case ModalDismissReasons.ESC:
         return 'by pressing ESC';
       case ModalDismissReasons.BACKDROP_CLICK:
         return 'by clicking on a backdrop';
       default:
         return `with: ${reason}`;
     }
   }
 
   confirm() {
    if(this.changepassModel.invalid){
      this.toastr.error('Vui lòng nhập đúng thông tin', 'Thông báo')
      return;
    }
     let obj = this.changepassModel.value;
     if(obj.newPassword == obj.oldPassword){
      this.toastr.error('Mật khẩu mới không được trùng với mật khẩu cũ', 'Thông báo');
      return
     }
     if(obj.newPassword != obj.confirmPassword){
      this.toastr.error('Xác nhận mật khẩu không trùng khớp', 'Thông báo');
      return
     }
     obj["id"] = this.khachhang.id
     this.outputEvent.emit(obj);
     this.modalRef.close();
   }
}
