import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import {  RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule,
    MatCardModule, MatSidenavModule, MatToolbarModule, MatListModule, MatPaginatorModule,
    MatTableModule, MatListModule, RouterModule,BaseChartDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardDetailComponent implements OnInit {

  //  // Mockup Data
  // public pieChartData: ChartData<'pie', number[], string | string[]> = {
  //   labels: ['KPI A', 'KPI B', 'KPI C'],
  //   datasets: [
  //     {
  //       data: [40, 25, 35],
  //       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  //     }
  //   ]
  // };

  // public pieChartOptions: ChartOptions<'pie'> = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     }
  //   }
  // };

  // // ชนิด chart แบบ fix ไว้เป็น 'pie'
  // public pieChartType: 'pie' = 'pie';

    // ---------------- Pie Chart ----------------
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['KPI A', 'KPI B', 'KPI C'],
    datasets: [
      {
        data: [40, 25, 35],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      }
    ]
  };
  public pieChartOptions: ChartOptions<'pie'> = { responsive: true };
  public pieChartType: 'pie' = 'pie';

  // ---------------- Bar Chart ----------------
  public barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      { label: 'Sales 2024', data: [50, 60, 70, 80, 90], backgroundColor: '#36A2EB' },
      { label: 'Sales 2025', data: [65, 75, 85, 95, 105], backgroundColor: '#FF6384' }
    ]
  };
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { position: 'top' } }
  };
  public barChartType: 'bar' = 'bar';


  constructor() { }

  ngOnInit() {
  }

}
