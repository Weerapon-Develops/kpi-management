import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { AccountComponent } from './pages/account/account.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'account', component: AccountComponent },
      // เพิ่มหน้าอื่น ๆ เช่น:
      // { path: 'settings/profile', component: ProfileComponent },
      // { path: 'messages', component: MessagesComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
