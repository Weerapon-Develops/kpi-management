import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertProvider } from '../Provider/alert.provider';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../Services/api.service';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-v2',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatButtonModule]
})

export class LoginComponent {

  public strMessage: String = "";
  public objLogin: Login = { userName: "", password: "" };
  public userName: String = "";
  public isShowMessage: boolean = true;
  num: any;
  formDisable: boolean = false;
  constructor(
    private ApiService: ApiService,
    private router: Router,
    private alertProvider: AlertProvider) { }

  ngOnInit(): void {

    console.log(this.objLogin.userName);

  }

  async onclickSignIn() {

    if (this.objLogin.userName.length === 0) {

      Swal.fire({
        title: 'คำเตือน',
        text: 'โปรดระบุ Username',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
      return
    } else if (this.objLogin.password.length === 0) {

      Swal.fire({
        title: 'คำเตือน',
        text: 'โปรดระบุ Password',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });

      return
    } else {
      Swal.fire({
        title: 'Login...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); // แสดง spinner
        }
      });
      const data = await this.ApiService.login(this.objLogin.userName, this.objLogin.password);
console.log(data);

      if (data.success) {
        Swal.close();
        Swal.fire({
          title: 'สำเร็จ',
          text: 'เข้าสู่ระบบสำเร็จ',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });

        // localStorage.setItem('token', data.token);
        // localStorage.setItem('userName', data.)
        this.router.navigate(['dashboard']);
        this.isShowMessage = false

      }
      else {

        Swal.fire({
          title: 'ผิดพลาด',
          text: 'UserName หรือ Password ผิดพลาด',
          icon: 'warning',
          confirmButtonText: 'ตกลง'
        });
        this.strMessage = data.message;
        this.isShowMessage = true;
      }

    }

  }

  onclickRegister() {
    this.router.navigate(['register']);
  }
}

export interface Login {
  userName: string;
  password: string;
}
