import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AlertProvider } from '../Provider/alert.provider';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatCardModule,MatSelectModule],
})
export class RegisterComponent implements OnInit {

  public strMessage: String = "";
  public objRegister: Login = { userName: "", password: "", confirmPassword: "", email: "", roleId: null};
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


      var data = await this.ApiService.postAPI("Auth/register",this.objRegister).toPromise();
  console.log("data", data);
  if (data.success) {
    this.router.navigate(['/login']);
  }

    // if (this.objRegister.email.length ===0){
    //   console.log("email");

    //   this.alertProvider.toastrWarning('โปรดระบุ Email');
    // }

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
