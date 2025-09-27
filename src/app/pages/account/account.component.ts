import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-account',
  standalone: true,
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  imports: [CommonModule, FormsModule, MatCardModule]
})

export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Account");

  }

}
