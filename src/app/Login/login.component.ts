import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertProvider } from '../Provider/alert.provider';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../Services/api.service';


@Component({
  selector: 'app-login-v2',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatCardModule]
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
      this.alertProvider.toastrWarning('โปรดระบุ Username');
      return
    } else if (this.objLogin.password.length === 0) {
      this.alertProvider.toastrWarning('โปรดระบุ Password');
      return
    } else {
      // this.router.navigate(['landing-page']);
      // this.alertProvider.toastrSuccess('เข้าสู่ระบบสำเร็จ');
      // }
      const loginres = await this.ApiService.login(this.objLogin.userName, this.objLogin.password);
      console.log("result", loginres);

      if (loginres.success) {
        console.log("Success");
        localStorage.setItem('token', loginres.token);
        this.router.navigate(['dashboard']);
        this.isShowMessage = false

      }
      else {
        this.strMessage = loginres.message;
        this.isShowMessage = true;
      }

    }

  }
}

export interface Login {
  userName: string;
  password: string;
}
