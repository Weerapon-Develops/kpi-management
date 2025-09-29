import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '@services/api.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-kpi-dialog',
  templateUrl: './add-kpi-dialog.component.html',
  styleUrls: ['./add-kpi-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AddKpiDialogComponent {
  public strMessage: String = "";
  public objRegister: Kpi = {
    id: 0,
    title: "",
    description: "",
    targetValue: 0,
    actualValue: 0,
    assignedUser: 0,
    status: "",
    startDate: new Date(),
    endDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  public userName: String = "";
  public isShowMessage: boolean = true;
  num: any;
  formDisable: boolean = false;
  dataGetAllUser: any[] = [];
  dataStatus: { label: string; value: string }[] = [
    { label: 'On Track', value: 'On Track' },
    { label: 'At Risk', value: 'At Risk' },
    { label: 'Off Track', value: 'Off Track' }
  ];

  constructor(
    public dialogRef: MatDialogRef<AddKpiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ApiService: ApiService
  ) { }

  ngOnInit() {
    this.getAllRole();
  }

  async getAllRole() {
    this.dataGetAllUser = await this.ApiService.getAPI("Account/GetAllUser").toPromise();
    console.log("dataGetAllRole", this.dataGetAllUser);
  }


  async onSubmit() {
    if (this.objRegister.title == "") {
      Swal.fire({
        title: 'คำเตือน',
        text: 'โปรดระบุ Title',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    } else if (this.objRegister.description == "") {
      Swal.fire({
        title: 'คำเตือน',
        text: 'โปรดระบุ Description',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    } else if (this.objRegister.targetValue == 0) {
      Swal.fire({
        title: 'คำเตือน',
        text: 'โปรดระบุ Target Value',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    } else if (this.objRegister.actualValue == 0) {
      Swal.fire({
        title: 'คำเตือน',
        text: 'โปรดระบุ Actual Value',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    } else if (this.objRegister.assignedUser == 0) {
      Swal.fire({
        title: 'คำเตือน',
        text: 'โปรดระบุ Assigned User',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    } else if (this.objRegister.status == "") {
      Swal.fire({
        title: 'คำเตือน',
        text: 'โปรดระบุ Status',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    } else if (this.objRegister.startDate == null) {
      Swal.fire({
        title: 'คำเตือน',
        text: 'โปรดระบุ Start Date',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    } else if (this.objRegister.endDate == null) {
      Swal.fire({
        title: 'คำเตือน',
        text: 'โปรดระบุ End Date',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    } else {
      this.dialogRef.close(this.objRegister);
    }
  }

  onCancel() {
    Swal.fire({
      title: 'คำเตือน',
      text: 'คุณต้องการออกจากหน้านี้โดยไม่บันทึกการเปลี่ยนแปลงใช่ไหม?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
      }
    });

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
