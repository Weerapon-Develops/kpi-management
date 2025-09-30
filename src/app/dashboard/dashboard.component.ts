import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertProvider } from '../Provider/alert.provider';
import { ApiService } from '@services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { RoleLevelService } from '@services/role-level.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule,
    MatCardModule, MatSidenavModule, MatToolbarModule, MatListModule, MatPaginatorModule,
    MatTableModule, MatListModule, SidebarComponent, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit {

  isSidebarCollapsed = false;
  dataRoleLevel: any[] = [];

  onSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    console.log(this.isSidebarCollapsed);

  }

  constructor(
    private ApiService: ApiService,
    private router: Router,
    private alertProvider: AlertProvider,
    private roleLevelService: RoleLevelService) { }

  ngOnInit() {
    this.roleLevelService.fetchRoleLevel();
    this.roleLevelService.roleLevel$.subscribe(data => {
      setTimeout(() => {
        Swal.fire({
          title: 'GetData...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading(); // แสดง spinner
          }
        });

        const role = localStorage.getItem('Role');
        // console.log(role);

        if (role === "User") {
          this.router.navigate(['dashboard/kpi']);
        }
        if (data && this.router.url === '/dashboard') {
          this.useRoleLevel(data);
        }
        Swal.close();
      }, 1000);

    });
  }

  useRoleLevel(data: any) {
    console.log("componentDashboard");


    const role = localStorage.getItem('Role');

    if (role === 'Admin') {
      this.router.navigate(['dashboard/dashboardList']);
    } else if (role === 'User') {
      this.router.navigate(['dashboard/kpi']);
    } else {
      this.router.navigate(['/login']);
    }

  }


}
