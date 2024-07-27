import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { NotfoundComponent } from './page/notfound/notfound.component';


@NgModule({
  declarations: [
    SystemComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule
  ],
})
export class SystemModule { }
