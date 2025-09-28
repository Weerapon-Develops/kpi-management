import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { RoleLevelService } from '@services/role-level.service';
import { ApiService } from '@services/api.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { S } from 'node_modules/@angular/material/error-options.d-CGdTZUYk';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule,
    MatTableModule, MatInputModule, MatIconModule, MatButtonModule,
    ReactiveFormsModule, MatSelectModule, MatDialogModule]

})
export class KpiComponent implements OnInit {
  dataRow: Kpi[] = [];
  editedUser: Kpi | null = null;
  displayedColumns: string[] = ['id', 'title', 'description', 'targetValue', 'actualValue','status', 'assignedUser','startDate','endDate', 'actions'];
  editedRowId: number | null = null;
  dataGetAllUser: any[] = [];

  // objRegister: any = {
  //   userName: '',
  //   password: '',
  //   confirmPassword: '',
  //   email: '',
  //   roleId: ''
  // };


  constructor(private roleLevelService: RoleLevelService,
    private ApiService: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) { }

 ngOnInit() {
    this.roleLevelService.fetchRoleLevel();
    this.roleLevelService.roleLevel$.subscribe(data => {
      if (data) {
        this.useRoleLevel(data);
      }
    });
    this.getAllUser();
    this.getAllRole();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '700px',
      maxWidth: '95vw',
      data: { roles: this.dataGetAllUser },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New user:', result);
        // เรียก API เพื่อเพิ่ม user
        this.ApiService.postAPI("Auth/register", result).subscribe(res => {
          if (res.success) {
            this.dataRow.push(res.user); // หรือจะ reload ทั้ง list ก็ได้
            this.getAllUser();
          }
        });
      }
    });
  }

  async getAllRole() {
    this.dataGetAllUser = await this.ApiService.getAPI("Account/GetAllUser").toPromise();
    console.log("dataGetAllRole", this.dataGetAllUser);
  }

  async getAllUser() {
    this.dataRow = await this.ApiService.getAPI("Kpi/GetAllKpi").toPromise();
    console.log("dataRow", this.dataRow);
  }

  useRoleLevel(data: any) {
    // console.log(JSON.stringify(data));

  }

  // getRoleName(roleId: string | number): string {
  //   const role = this.dataGetAllRole.find(r => r.id === roleId);
  //   return role ? role.name : roleId.toString();
  // }



  editUser(user: Kpi) {
    this.editedRowId = user.id;
    this.editedUser = { ...user }; // clone เพื่อแก้ไข
  }


  cancelEdit() {
    this.editedRowId = null;
    this.editedUser = null;
  }


  async saveUser(user: Kpi) {
    if (!this.editedUser) return;

    // const payload = {
    //   id: this.editedUser.id,
    //   username: this.editedUser.username,
    //   email: this.editedUser.email,
    //   roleId: this.editedUser.roleId
    // };
    // console.log(JSON.stringify(payload));

    // try {
    //   const response = await this.ApiService.postAPI("Account/UpdateUser", payload).toPromise();
    //   if (response?.success) {
    //     this.dataRow = this.dataRow.map(u =>
    //       u.id === user.id ? { ...response.user } : u
    //     );
    //     this.editedRowId = null;
    //     this.editedUser = null;
    //   }
    // } catch (error) {
    //   console.error("Update error:", error);
    // }
  }



  async deleteUser(id: number): Promise<void> {
    try {
      console.log("id", id);

      const response = await this.ApiService.postAPI(`Account/DeleteUser/${id}`, {}).toPromise();
      console.log("Delete response:", response);

      if (response?.success) {
        this.dataRow = this.dataRow.filter(u => u.id !== id);
        // Optional: show toast or snackbar here
      } else {
        console.warn("Delete failed:", response?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  }



}
interface Kpi {
  id: number;
  title: string;
  description: string;
  targetValue: number;
  actualValue: number;
  assignedUser: number;
  status: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date
  updatedAt: Date;
}
