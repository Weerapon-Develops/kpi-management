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

import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { ApiService } from '@services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule,
    MatCardModule, MatSidenavModule, MatToolbarModule, MatListModule, MatPaginatorModule,
    MatTableModule, MatListModule, RouterModule, BaseChartDirective, MatFormFieldModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule],

  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardDetailComponent implements OnInit {
  // Pie Chart
  public pieChartUser: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: []
  };

  // Pie Chart
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: []
  };

  // Bar Chart
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  searchForm: FormGroup;
  dataRow: any[] = [];
  dataGetAllUser: any[] = [];

  dataStatus: { label: string; value: string }[] = [
    { label: 'On Track', value: 'On Track' },
    { label: 'At Risk', value: 'At Risk' },
    { label: 'Off Track', value: 'Off Track' }
  ];

  constructor(private ApiService: ApiService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      id: [null],
      status: [''],
      startDate: [null],
      endDate: [null]
    });
  }

  ngOnInit() {
    this.getGetAllKpi();
    this.getAllRole();
  }

  async getAllRole() {
    this.dataGetAllUser = await this.ApiService.getAPI("Account/GetAllUser").toPromise();
    // console.log("dataGetAllRole", this.dataGetAllUser);
  }

  async getGetAllKpi() {
    // this.dataRow = await this.ApiService.getAPI("Kpi/GetDashboard").toPromise();
    var result = {
      id: null,
      status: "",
      startDate: null,
      endDate: null,
      name: ""
    }
    this.ApiService.postAPI("Kpi/GetDashboard", result).subscribe(res => {
      console.log("res", res);

      if (res) {
        this.dataRow = res.data;
        console.log("dataRow", this.dataRow);
        this.pieChartData = this.mapToPieChart(this.dataRow);
        this.barChartData = this.mapToBarChart(this.dataRow);
        this.pieChartUser = this.maptoPieUserChart(this.dataRow)
      }
    });



    // console.log(this.dataRow);




  }


  maptoPieUserChart(data: any[]): ChartData<'pie', number[], string | string[]> {
    return {
      labels: data.map(d => `${d.username} - ${d.description}`),
      datasets: [
        {
          data: data.map(d => d.actualValue ),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }

      ]
    };
  }


  mapToPieChart(data: any[]): ChartData<'pie', number[], string | string[]> {
    return {
      labels: data.map(d => d.title),
      datasets: [
        {
          data: data.map(d => d.actualValue),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }
      ]
    };
  }


  mapToBarChart(data: any[]): ChartData<'bar'> {
    return {
      labels: data.map(d => d.username),
      datasets: [
        {
          label: 'Target',
          data: data.map(d => d.targetValue),
          backgroundColor: '#36A2EB'
        },
        {
          label: 'Actual',
          data: data.map(d => d.actualValue),
          backgroundColor: '#FF6384'
        }
      ]
    };
  }

  async onSearch() {
    console.log("searchForm :", this.searchForm);
    const criteria = this.searchForm.value;



    var result = {
      id: criteria.id ?? null,
      status: criteria.status ?? "",
      startDate: criteria.startDate ?? null,
      endDate: criteria.endDate ?? null,
      name: ""
    }

    console.log("result", result);

    this.ApiService.postAPI("Kpi/GetDashboard", result).subscribe(res => {
      console.log("res", res);

      if (res) {
        this.dataRow = res.data;
        console.log("dataRow", this.dataRow);
        this.pieChartData = this.mapToPieChart(this.dataRow);
        this.barChartData = this.mapToBarChart(this.dataRow);
        this.pieChartUser = this.maptoPieUserChart(this.dataRow)
      }
    });




  }

  onClear(): void {
    this.searchForm.reset();
    this.getGetAllKpi();

  }



}
