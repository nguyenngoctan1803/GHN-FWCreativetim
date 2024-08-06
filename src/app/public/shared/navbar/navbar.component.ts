import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CustomerService } from 'app/public/service/customer.service';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { SubjectService } from 'app/shared/service/subject.service';
import { StorageService } from 'app/shared/service/storage.service';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';


@Component({
    selector: 'app-modal-content',
    template: `
    <div class="modal-header">
        <h5 class="modal-title text-center">Đăng xuất</h5>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        Bạn có chắc chắn muốn đăng xuất?
    </div>
    <div class="modal-footer">
        <div class="left-side">
            <button type="button" class="btn btn-default btn-link" (click)="activeModal.close('Close click')">Hủy</button>
        </div>
        <div class="divider"></div>
        <div class="right-side">
            <button type="button" class="btn btn-danger btn-link" (click)="confirmLogout()">Xác nhận</button>
        </div>
    </div>
    `
})
export class NgbdModalContent {
    constructor(
        public activeModal: NgbActiveModal,
        private customerService: CustomerService,
        private subjectService: SubjectService,
    ) {}

    confirmLogout(){
        this.customerService.logout();
        this.subjectService.logout();
        this.activeModal.close();
        window.location.reload();
    }
}

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    private toggleButton: any;
    private sidebarVisible: boolean;
    userName: string = '';
    isLoggedIn: boolean;

    constructor(
        public location: Location, 
        private element : ElementRef,
        private subjectService: SubjectService,
        private modalService: NgbModal,
        private storage: StorageService,
        private router: Router
    ) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.subjectService.isLoggedIn.subscribe(loggedIn => {
            this.isLoggedIn = loggedIn;
            this.userName = this.storage.getJsonPropertyFromCookie(environment.khachHang, 'hoTen') ?? '';
          });
    }

    onLogout(){
        const modalRef = this.modalService.open(NgbdModalContent);
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isActiveMenu(url){
        var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
      return titlee == url
    }
    isDocumentation() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }

    navigateProfile(){
        this.router.navigateByUrl('/public/profile');
    }
}
