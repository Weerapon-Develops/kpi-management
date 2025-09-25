import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
}) export class AlertProvider {
  private isConfirm: boolean;

  constructor(private toastrService: ToastrService) {
    this.isConfirm = false;
  }

  swalSucces() {
    Swal.fire({
      title: 'สำเร็จ!',
      html: 'คุณได้ทำรายการเรียบร้อยแล้ว',
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'ตกลง',
      showCancelButton: false,
    });
  }

  swalSuccessWithText(htmlText: string) {
    Swal.fire({
      title: 'สำเร็จ!',
      html: htmlText,
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'ตกลง',
      showCancelButton: false,
    });
  }

  swalSuccessWithTitle(titleText: string, htmlText: string) {
    Swal.fire({
      title: titleText,
      html: htmlText,
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'ตกลง',
      showCancelButton: false,
    });
  }

  swalInfo(titleText: string, htmlText: string) {
    Swal.fire({
      title: titleText,
      html: htmlText,
      icon: 'info',
      showConfirmButton: true,
      confirmButtonText: 'ตกลง',
      showCancelButton: false,
    });
  }

  swalQuestion(titleText: string, htmlText: string) {
    Swal.fire({
      title: titleText,
      html: htmlText,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'ตกลง',
      showCancelButton: false,
    });
  }

  swalWarningWithText(htmlText: string) {
    Swal.fire({
      title: 'แจ้งเตือน!',
      html: htmlText,
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'ตกลง',
      showCancelButton: false,
    });
  }

  swalWarningWithTitle(titleText: string, htmlText: string) {
    Swal.fire({
      title: titleText,
      html: htmlText,
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'ตกลง',
      showCancelButton: false,
    });
  }

  swalErrorWithText(htmlText: string) {
    Swal.fire({
      title: 'เกิดข้อผิดพลาด!',
      html: htmlText,
      icon: 'error',
      showConfirmButton: true,
      confirmButtonText: 'ตกลง',
      showCancelButton: false,
    });
  }

  swalErrorWithTitle(titleText: string, htmlText: string) {
    Swal.fire({
      title: titleText,
      html: htmlText,
      icon: 'error',
      showConfirmButton: true,
      confirmButtonText: 'ตกลง',
      showCancelButton: false,
    });
  }
  async swalConfirm(htmlText: string) {
    this.isConfirm = await Swal.fire({
      title: 'ยืนยันทำรายการ',
      html: htmlText,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'ตกลง',
      showCancelButton: true,
      cancelButtonText: 'ยกเลิก'
    }).then((result: any) => {
      return result.isConfirmed;
    });

    return this.isConfirm;
  }

  async swalConfirmClear() {
    this.isConfirm = await Swal.fire({
      title: 'ล้างค่าเบี้ยหรือไม่ ?',
     // html: htmlText,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'ตกลง',
      showCancelButton: true,
      cancelButtonText: 'ยกเลิก'
    }).then((result: any) => {
      return result.isConfirmed;
    });
    return this.isConfirm;
  }

  async swalConfirmWithTitle(titleText: string, htmlText: string) {
    this.isConfirm = await Swal.fire({
      title: titleText,
      html: htmlText,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'ตกลง',
      showCancelButton: true,
      cancelButtonText: 'ยกเลิก'
    }).then((result: any) => {
      return result.isConfirmed;
    });
    return this.isConfirm;
  }

  async swalConfirmDelete() {
    this.isConfirm = await Swal.fire({
      title: 'ยืนยันทำรายการ',
      html: 'คุณต้องการลบข้อมูลใช่หรือไม่ ?',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'ตกลง',
      showCancelButton: true,
      cancelButtonText: 'ยกเลิก'
    }).then((result: any) => {
      return result.isConfirmed;
    });
    return this.isConfirm;
  }


  // ------------------------------

  toastrClear() {
    this.toastrService.clear();
  }

  toastrRemove(toastId: number) {
    this.toastrService.remove(toastId);
  }

  toastrSuccess(text: string) {
    this.toastrService.success(text, '', {
      positionClass: 'toast-top-right'
    });
  }

  toastrSaveSuccess() {
    this.toastrService.success('บันทึกรายการเรียบร้อยแล้ว', '', {
      positionClass: 'toast-top-right'
    });
  }

  toastrDeleteSuccess() {
    this.toastrService.success('ลบรายการเรียบร้อยแล้ว', '', {
      positionClass: 'toast-top-right'
    });
  }

  toastrWarning(text: string) {
    this.toastrService.warning(text, '', {
      positionClass: 'toast-top-right'
    });
  }

  toastrError(text: string) {
    this.toastrService.error(text, 'เกิดข้อผิดพลาด !', {
      positionClass: 'toast-top-right'
    });
  }

  toastrSaving() {
    this.toastrService.info('<div class="spinner spinner-white spinner-right">กำลังบันทึกรายการ ...</div>', '', {
      positionClass: 'toast-top-right',
      disableTimeOut: true,
      enableHtml: true
    });
  }

  toastrLoading() {
    this.toastrService.info('<div class="spinner spinner-white spinner-right">กำลังโหลดรายการ ...</div>', '', {
      positionClass: 'toast-top-right',
      disableTimeOut: true,
      enableHtml: true
    });
  }

  toastrWaiting() {
    this.toastrService.info('<div class="spinner spinner-white spinner-right">โปรดรอสักครู่ ...</div>', '', {
      positionClass: 'toast-top-right',
      disableTimeOut: true,
      enableHtml: true
    });
  }

  toastrDeleting() {
    this.toastrService.info('<div class="spinner spinner-white spinner-right">กำลังลบรายการ ...</div>', '', {
      positionClass: 'toast-top-right',
      disableTimeOut: true,
      enableHtml: true
    });
  }

  toastrWaitingText(text: string) {
    this.toastrService.info('<div class="spinner spinner-white spinner-right">' + text + '</div>', '', {
      positionClass: 'toast-top-right',
      disableTimeOut: true,
      enableHtml: true
    });
  }

}
