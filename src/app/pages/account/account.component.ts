import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RoleLevelService } from '@services/role-level.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule,MatButtonModule]
})

export class AccountComponent implements OnInit {

  constructor(private roleLevelService: RoleLevelService) { }

  ngOnInit() {
  this.roleLevelService.fetchRoleLevel(); // เรียกครั้งเดียวตอนเริ่ม
  this.roleLevelService.roleLevel$.subscribe(data => {
    if (data) {
      this.useRoleLevel(data);
    }
  });
}

useRoleLevel(data: any) {
  console.log( JSON.stringify(data) );

}

}
