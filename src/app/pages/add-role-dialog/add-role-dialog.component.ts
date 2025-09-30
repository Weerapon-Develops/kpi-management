import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.scss'],
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
export class AddRoleDialogComponent implements OnInit {
  public strMessage: String = "";
  public objRegister: Role = {name: ""};
  public userName: String = "";
  public isShowMessage: boolean = true;
  // num: any;
  formDisable: boolean = false;
  dataRow: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ApiService: ApiService
  ) { }

 ngOnInit() {
   }



   async onSubmit() {

     if (this.objRegister.name == "") {
       Swal.fire({
         title: 'คำเตือน',
         text: 'โปรดระบุ Role',
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
interface Role {
  name: string;
}
