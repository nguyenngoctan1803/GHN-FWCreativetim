import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cancel-modal',
  templateUrl: './cancel-modal.component.html',
  styleUrls: ['./cancel-modal.component.css']
})
export class CancelModalComponent implements OnInit {

   // modal
   @ViewChild('modal') cancelModal: any;
   orderId: any;  
   @Output() outputEvent = new EventEmitter<any>();
   closeResult: string = '';
   modalRef: NgbModalRef;
   constructor(
     private modalService: NgbModal,
     private toastr: ToastrService,
   ) { }
 
   ngOnInit(): void {
 
   }
   openCancelModal(orderId) {
    this.orderId = orderId;
     this.modalRef = this.modalService.open(this.cancelModal, {
       ariaLabelledBy: 'modal-basic-title',
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
      this.outputEvent.emit(this.orderId);
      this.modalRef.close();
   }
}
