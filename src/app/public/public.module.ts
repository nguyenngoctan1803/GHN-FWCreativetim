import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './page/home/home.component';
import { SigninComponent } from './page/signin/signin.component';
import { SignupComponent } from './page/signup/signup.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { CustomerService } from './service/customer.service';
import { CreateOrderComponent } from './page/create-order/create-order.component';

import { NotfoundComponent } from './page/notfound/notfound.component';
import { PublicComponent } from './public.component';
import { NavbarComponent } from 'app/public/shared/navbar/navbar.component';
import { FooterComponent } from 'app/public/shared/footer/footer.component';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { NgSelect2Module } from 'ng-select2';
import { NgxPaginationModule } from 'ngx-pagination';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
}
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './page/profile/profile.component';
import { EditProfileComponent } from './page/profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './page/profile/change-password/change-password.component';
import { OrderComponent } from './page/order/order.component';
import { PipeModule } from './shared/modules/pipe/pipe.module';
import { DetailModalComponent } from './page/order/detail-modal/detail-modal.component';
import { CancelModalComponent } from './page/order/cancel-modal/cancel-modal.component';
@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    CreateOrderComponent,
    NotfoundComponent,
    PublicComponent,
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    OrderComponent,
    DetailModalComponent,
    CancelModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NouisliderModule,
    HttpClientModule,
    JwBootstrapSwitchNg2Module,
    NgWizardModule,
    NgSelect2Module,
    NgxPaginationModule,
    PerfectScrollbarModule,
    NgbTypeaheadModule,
    PipeModule,
    PublicRoutingModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
})
export class PublicModule { }
