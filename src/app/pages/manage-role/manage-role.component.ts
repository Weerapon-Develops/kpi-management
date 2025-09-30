import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RoleLevelService } from '@services/role-level.service';
import { ApiService } from '@services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { AddRoleDialogComponent } from '../add-role-dialog/add-role-dialog.component';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule,
    MatTableModule, MatInputModule, MatIconModule, MatButtonModule,
    ReactiveFormsModule, MatSelectModule, MatDialogModule]
})
export class ManageRoleComponent implements OnInit {
dataRow: Role[] = [];
  editedUser: Role | null = null;
  displayedColumns: string[] = ['id', 'name','actions'];
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
      this.GetAllRoles();
      this.getAllRole();
    }

    openAddDialog(): void {
      const dialogRef = this.dialog.open(AddRoleDialogComponent, {
        width: '700px',
        maxWidth: '95vw',
        data: { roles: this.dataGetAllRole },
        disableClose: false
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('New Role:', result);

          this.ApiService.postAPI("Role/InsertRole", result).subscribe(res => {
            console.log(res);

            if (res.success) {
              console.log("success");

              // this.dataRow.push(res.user);
              // this.dataRow = []
               this.GetAllRoles();
            }
          });
        }
      });
    }

    async getAllRole() {
      this.dataGetAllRole = await this.ApiService.getAPI("Account/GetAllRole").toPromise();
    }

    async GetAllRoles() {
      this.dataRow = await this.ApiService.getAPI("Role/GetAllRole").toPromise();
      console.log("dataRow",JSON.stringify(this.dataRow));

    }

    useRoleLevel(data: any) {
      // console.log(JSON.stringify(data));

    }

    getRoleName(roleId: string | number | undefined): string {
  if (roleId === undefined || roleId === null) {
    return '';
  }
  const role = this.dataGetAllRole.find(r => r.id === roleId);
  return role ? role.name : roleId.toString();
}



    editUser(user: Role) {
      this.editedRowId = user.id;
      this.editedUser = { ...user };
    }


    cancelEdit() {
      this.editedRowId = null;
      this.editedUser = null;
    }


    async saveUser(role: Role) {
      if (!this.editedUser) return;

      const payload = {
        id: this.editedUser.id,
        name: this.editedUser.name,
      };
      console.log(JSON.stringify(payload));

      try {
        const response = await this.ApiService.postAPI(`Role/UpdateRole/${payload.id}`, payload).toPromise();
        if (response?.success) {
          this.dataRow = [];
          this.GetAllRoles()

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
            const response = await this.ApiService.postAPI(`Role/DeleteRole/${id}`, {}).toPromise();

            if (response) {
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

interface Role {
  id: number;
  name: string;
  users: any[];
}

