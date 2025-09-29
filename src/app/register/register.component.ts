import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AlertProvider } from '../Provider/alert.provider';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatCardModule, MatSelectModule],
})
export class RegisterComponent implements OnInit {

  public strMessage: String = "";
  public objRegister: Login = { userName: "", password: "", confirmPassword: "", email: "", roleId: null };
  public userName: String = "";
  public isShowMessage: boolean = true;
  num: any;
  formDisable: boolean = false;
  dataRow: any[] = [];
  constructor(
    private ApiService: ApiService,
    private router: Router,
    private alertProvider: AlertProvider) { }



  ngOnInit() {
    this.getAllRole()
  }

  async getAllRole() {
    this.dataRow = await this.ApiService.getAPI("Account/GetAllRole").toPromise();
    console.log("dataRow", this.dataRow);
  }

  async onclickRegister() {
    console.log(this.objRegister);
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
          text: 'กรุณากรอกรหัสผ่านให้ตรงกันทั้งสองช่อง',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
      }
    } else {
      var data = await this.ApiService.postAPI("Auth/register", this.objRegister).toPromise();
      console.log("data", data);
      if (data.success) {
        this.router.navigate(['/login']);
      }
    }
  }

  onclickCancel() {

    this.router.navigate(['/login']);
  }

}

export interface Login {
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
  roleId: null;
}
