import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { NotfoundComponent } from './page/notfound/notfound.component';

const routes: Routes = [
  { path: "", children:[
    { path: "", redirectTo: "dashboard", pathMatch: "full" },
    { path: "dashboard", component: DashboardComponent },
  
    { path: '**', redirectTo: 'notfound' },
    { path: 'notfound', component: NotfoundComponent }
  ], component: SystemComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
