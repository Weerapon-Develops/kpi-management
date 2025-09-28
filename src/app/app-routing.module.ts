import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { AccountComponent } from './pages/account/account.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'dashboardList', pathMatch: 'full' },
      {
        path: 'account',
        loadComponent: () => import('./pages/account/account.component').then(m => m.AccountComponent)
      },
      {
        path: 'kpi',
        loadComponent: () => import('./pages/kpi/kpi.component').then(m => m.KpiComponent)
      },
      {
        path: 'dashboardList',
        loadComponent: () => import('./dashboard-detail/dashboard-detail.component').then(m => m.DashboardDetailComponent)
      }
    ]

  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
