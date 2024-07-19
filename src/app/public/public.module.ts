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
import { ApiService } from 'app/shared/service/api.service';
import { CustomerService } from './service/customer.service';
import { CreateOrderComponent } from './page/create-order/create-order.component';
import { StorageService } from 'app/shared/service/storage.service';


@NgModule({
  declarations: [
    HomeComponent,
    SigninComponent,
    SignupComponent,
    CreateOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NouisliderModule,
    RouterModule,
    HttpClientModule,
    JwBootstrapSwitchNg2Module,
    PublicRoutingModule,
  ],
  providers: [],
})
export class PublicModule { }
