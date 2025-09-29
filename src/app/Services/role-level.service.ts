import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service'; // ปรับตาม path จริง

@Injectable({
  providedIn: 'root'
})
export class RoleLevelService {
  private roleLevelSubject = new BehaviorSubject<any>(null);
  public roleLevel$: Observable<any> = this.roleLevelSubject.asObservable();

  constructor(private apiService: ApiService) {}

  fetchRoleLevel(): void {
    this.apiService.getAPIWithAuth("Auth/GetRoleLevel").subscribe({
      next: (data) => {
        this.roleLevelSubject.next(data);
        localStorage.setItem('Role', data.role);
      },
      error: (err) => console.error("Error fetching RoleLevel:", err)
    });
  }

  getCurrentRoleLevel(): any {
    return this.roleLevelSubject.getValue();
  }
}
