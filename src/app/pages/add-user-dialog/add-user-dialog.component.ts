import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class AddUserDialogComponent {


  public strMessage: String = "";
  public objRegister: Login = { userName: "", password: "", confirmPassword: "", email: "", roleId: null };
  public userName: String = "";
  public isShowMessage: boolean = true;
  num: any;
  formDisable: boolean = false;
  dataRow: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ApiService: ApiService
  ) { }


  ngOnInit() {
    this.getAllRole()
  }

  async getAllRole() {
    this.dataRow = await this.ApiService.getAPI("Account/GetAllRole").toPromise();
    console.log("dataRow", this.dataRow);
  }

  async onSubmit() {

    if (this.objRegister.userName == "") {
      Swal.fire({
        title: 'คำเตือน',
        text: 'โปรดระบุ UserName',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    } else if (this.objRegister.password == "") {
      Swal.fire({
        title: 'คำเตือน',
        text: 'โปรดระบุ Password',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    } else if (this.objRegister.confirmPassword == "") {
      Swal.fire({
        title: 'คำเตือน',
        text: 'โปรดระบุ Confirm Password',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    } else if (this.objRegister.email == "") {
      Swal.fire({
        title: 'คำเตือน',
        text: 'โปรดระบุ Email',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    } else if (this.objRegister.roleId == null) {
      Swal.fire({
        title: 'คำเตือน',
        text: 'โปรดระบุ User Role',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    } else if (this.objRegister.password != "" && this.objRegister.confirmPassword != "") {
      if (this.objRegister.password === this.objRegister.confirmPassword) {
      } else {
        Swal.fire({
          title: 'รหัสผ่านไม่ตรงกัน',
          text: 'กรุณากรอก Confirm Password และ Password ให้ตรงกัน',
          icon: 'warning',
          confirmButtonText: 'ตกลง'
        });
      }
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
export interface Login {
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
  roleId: null;
}
