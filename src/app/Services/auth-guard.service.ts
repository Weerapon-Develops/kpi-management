import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // หรือ sessionStorage
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']); // redirect กลับหน้า login
      console.log("redirect กลับหน้า login");

      return false;
    }
  }
}
