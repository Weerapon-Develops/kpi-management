import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule]

})
export class KpiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("KPI");

  }

}
