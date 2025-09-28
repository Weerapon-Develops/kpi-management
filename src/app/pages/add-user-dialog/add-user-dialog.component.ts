import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '@services/api.service';


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
      this.dialogRef.close(this.objRegister);
  }

  onCancel() {
    this.dialogRef.close();
  }


}
export interface Login {
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
  roleId: null;
}
