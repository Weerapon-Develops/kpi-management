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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddKpiDialogComponent } from '../add-kpi-dialog/add-kpi-dialog.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule,
    MatTableModule, MatInputModule, MatIconModule, MatButtonModule,
    ReactiveFormsModule, MatSelectModule, MatDialogModule, MatDatepickerModule,
    MatNativeDateModule]

})
export class KpiComponent implements OnInit {
  dataRow: Kpi[] = [];
  editedKPI: Kpi | null = null;
  displayedColumns: string[] = ['id', 'title', 'description', 'targetValue', 'actualValue', 'status',
    'assignedUser', 'startDate', 'endDate', 'actions'];
  editedRowId: number | null = null;
  dataGetAllUser: any[] = [];

  dataStatus: { label: string; value: string }[] = [
    { label: 'On Track', value: 'On Track' },
    { label: 'At Risk', value: 'At Risk' },
    { label: 'Off Track', value: 'Off Track' }
  ];

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
    this.getGetAllKpi();
    this.getAllUser();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddKpiDialogComponent, {
      width: '700px',
      maxWidth: '95vw',
      data: { roles: this.dataGetAllUser },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Json', JSON.stringify(result));
        // เรียก API เพื่อเพิ่ม user
        this.ApiService.postAPI("Kpi/InsertKpi", result).subscribe(res => {
          if (res.success) {
            // this.dataRow.push(res.user);
            // this.getGetAllKpi();
            this.dataRow = [...this.dataRow, res.user];
          }
        });
      }
    });
  }

  async getAllUser() {
    this.dataGetAllUser = await this.ApiService.getAPI("Account/GetAllUser").toPromise();
    console.log("dataGetAllRole", this.dataGetAllUser);
  }

  async getGetAllKpi() {
    this.dataRow = await this.ApiService.getAPI("Kpi/GetAllKpi").toPromise();
    let StrRole = localStorage.getItem("Role")
    let UserId = localStorage.getItem("userId")?? 0;

    if (StrRole != null) {
      if (StrRole === "User") {
        this.dataRow = this.dataRow.filter(x => x.assignedUser == UserId)
        console.log("User");

      }
    }


    console.log("dataRow", this.dataRow);
  }

  useRoleLevel(data: any) {
    // console.log(JSON.stringify(data));

  }

  // getRoleName(assignedUser: string | number): string {
  //   const role = this.dataGetAllUser.find(r => r.id === assignedUser);
  //   return role ? role.username : assignedUser.toString();
  // }
  getRoleName(assignedUser: string | number | undefined | null): string {
    if (assignedUser === undefined || assignedUser === null) return '';

    const role = this.dataGetAllUser.find(r => r.id === assignedUser);
    return role ? role.username : String(assignedUser);
  }


  getStatusName(status: string): string {
    if (!status) return '';
    const matched = this.dataStatus.find(s => s.value === status);
    return matched ? matched.label : status;
  }


  editUser(user: Kpi) {
    this.editedRowId = user.id;
    this.editedKPI = { ...user }; // clone เพื่อแก้ไข
  }

  cancelEdit() {
    this.editedRowId = null;
    this.editedKPI = null;
  }

  async saveKpi(dataKpi: Kpi) {
    if (!this.editedKPI) return;

    const payload = {
      id: this.editedKPI.id,
      title: this.editedKPI.title,
      description: this.editedKPI.description,
      targetValue: this.editedKPI.targetValue,
      actualValue: this.editedKPI.actualValue,
      status: this.editedKPI.status,
      assignedUser: this.editedKPI.assignedUser,
      startDate: this.editedKPI.startDate,
      endDate: this.editedKPI.endDate
    };

    // console.log(JSON.stringify(payload));

    try {
      const response = await this.ApiService.postAPI(`Kpi/UpdateKpi/${this.editedKPI.id}`, payload).toPromise();

      if (response?.success) {
        this.dataRow = [];
        this.getGetAllKpi()
        // this.dataRow = this.dataRow.map(u =>
        //   u.id === dataKpi.id ? { ...response.data } : u
        // );
        this.editedRowId = null;
        this.editedKPI = null;
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
          const response = await this.ApiService.postAPI(`Kpi/DeleteKpi/${id}`, {}).toPromise();

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
