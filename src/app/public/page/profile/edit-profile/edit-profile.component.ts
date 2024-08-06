import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

   // modal
   @ViewChild('modal') updateModal: any;
   khachhang: any;  
   @Output() outputEvent = new EventEmitter<any>();
   closeResult: string = '';
   modalRef: NgbModalRef;
   updateModel = new FormGroup({
     email: new FormControl('', [Validators.required, Validators.email]),
     hoTen: new FormControl('', [Validators.required]),
   });
 
   constructor(
     private modalService: NgbModal,
     private toastr: ToastrService,
   ) { }
 
   ngOnInit(): void {
 
   }
   openUpdateModal(khachhang) {
    this.khachhang = khachhang;
    this.updateModel.controls.email.setValue(khachhang.email); 
    this.updateModel.controls.hoTen.setValue(khachhang.hoTen); 
     this.modalRef = this.modalService.open(this.updateModal, {
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
    if(this.updateModel.invalid){
      this.toastr.error('Vui lòng nhập đúng thông tin', 'Thông báo')
      return;
    }
     let obj1 = this.updateModel.value;
     let obj = {
       khachHangID: this.khachhang.id,
       hoTen: obj1.hoTen,
       email: obj1.email,
     }
     this.outputEvent.emit(obj);
     this.modalRef.close();
   }

}
