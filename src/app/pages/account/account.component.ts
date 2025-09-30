import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { RoleLevelService } from '@services/role-level.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule,
    MatTableModule, MatInputModule, MatIconModule, MatButtonModule,
    ReactiveFormsModule, MatSelectModule, MatDialogModule]
})

export class AccountComponent implements OnInit {
  dataRow: User[] = [];
  editedUser: User | null = null;
  displayedColumns: string[] = ['id', 'username', 'email', 'roleId', 'createdAt', 'updatedAt', 'actions'];
  editedRowId: number | null = null;
  dataGetAllRole: any[] = [];

  objRegister: any = {
    userName: '',
    password: '',
    confirmPassword: '',
    email: '',
    roleId: ''
  };


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
      data: { roles: this.dataGetAllRole },
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
    this.dataGetAllRole = await this.ApiService.getAPI("Account/GetAllRole").toPromise();
  }

  async getAllUser() {
    this.dataRow = (await this.ApiService.getAPI("Account/GetAllUser").toPromise())
      .sort((a: any, b: any) => a.id - b.id);
  }

  useRoleLevel(data: any) {
    // console.log(JSON.stringify(data));

  }

  getRoleName(roleId: string | number): string {
    const role = this.dataGetAllRole.find(r => r.id === roleId);
    return role ? role.name : roleId.toString();
  }



  editUser(user: User) {
    this.editedRowId = user.id;
    this.editedUser = { ...user }; // clone เพื่อแก้ไข
  }


  cancelEdit() {
    this.editedRowId = null;
    this.editedUser = null;
  }


  async saveUser(user: User) {
    if (!this.editedUser) return;

    const payload = {
      id: this.editedUser.id,
      username: this.editedUser.username,
      email: this.editedUser.email,
      roleId: this.editedUser.roleId
    };
    console.log(JSON.stringify(payload));

    try {
      const response = await this.ApiService.postAPI("Account/UpdateUser", payload).toPromise();
      if (response?.success) {
        this.dataRow = [];
        this.getAllUser()
        // this.dataRow = this.dataRow.map(u =>
        //   u.id === user.id ? { ...response.user } : u
        // );
        this.editedRowId = null;
        this.editedUser = null;
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  }



  async deleteUser(id: number): Promise<void> {
    try {

      Swal.fire({
        title: 'คำเตือน',
        text: 'คุณต้องการลบข้อมูลหรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.ApiService.postAPI(`Account/DeleteUser/${id}`, {}).toPromise();

          if (response?.success) {
            this.dataRow = this.dataRow.filter(u => u.id !== id);
            Swal.fire({
              title: 'สำเร็จ',
              text: 'ลบข้อมูลสำเร็จ',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true
            });
          } else {
            Swal.fire({
              title: 'ลบข้อมูลไม่สำเร็จ',
              text: response?.message,
              icon: 'warning'
            });

          }

        }
      });



    } catch (error) {
      console.error("Delete error:", error);
    }
  }


}
interface User {
  id: number;
  username: string;
  email: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
}
