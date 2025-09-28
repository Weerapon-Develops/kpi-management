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
    MatCardModule
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
  dataRow: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddKpiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ApiService: ApiService
  ) { }

  ngOnInit() {
    this.getAllUser();
  }

   async getAllUser() {
    this.dataRow = await this.ApiService.getAPI("Kpi/GetAllKpi").toPromise();
    console.log("dataRow", this.dataRow);
  }

  async onSubmit() {
    this.dialogRef.close(this.objRegister);
  }

  onCancel() {
    this.dialogRef.close();
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
