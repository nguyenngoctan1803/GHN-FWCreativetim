import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './examples/signup/signup.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { SigninComponent } from './examples/signin/signin.component';

const routes: Routes =[
    { path: '', redirectTo: 'public', pathMatch: 'full' },
    { path: 'public', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
    // { path: 'user-profile',     component: ProfileComponent },
    // { path: 'signup',           component: SignupComponent },
    // { path: 'signin',           component: SigninComponent },
    // { path: 'landing',          component: LandingComponent },
    // { path: 'nucleoicons',      component: NucleoiconsComponent }
    { path: 'component',      component: ComponentsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
