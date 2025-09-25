import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  LoginComponent } from './Login/login.component';
import { AuthLoginComponent } from './AuthLogin/auth-login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
