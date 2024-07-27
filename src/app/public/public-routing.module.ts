import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./page/home/home.component";
import { SignupComponent } from "./page/signup/signup.component";
import { SigninComponent } from "./page/signin/signin.component";
import { CustomerGuard } from "./guard/customer-guard/customer.guard";
import { CreateOrderComponent } from "./page/create-order/create-order.component";
import { NotfoundComponent } from "./page/notfound/notfound.component";
import { PublicComponent } from "./public.component";

const routes: Routes = [
  { path: "", children:[
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "create-order", component: CreateOrderComponent, canActivate: [CustomerGuard] },
    { path: "signin", component: SigninComponent },
    { path: "signup", component: SignupComponent},
  
    { path: '**', redirectTo: 'notfound' },
    { path: 'notfound', component: NotfoundComponent }
  ], component: PublicComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
