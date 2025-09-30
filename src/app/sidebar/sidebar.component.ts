import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { RoleLevelService } from '@services/role-level.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [MatListModule, CommonModule, RouterModule]
})
export class SidebarComponent implements OnInit {
  @Input() isSidebarCollapsed: boolean = false
  @Output() sidebarToggle = new EventEmitter<void>();
  menuItems: MenuItem[] = [];
  email: string = "";
  username: string = "";

  constructor(
    private router: Router,
    private roleLevelService: RoleLevelService
  ) { }

  ngOnInit() {
    this.roleLevelService.fetchRoleLevel();
    this.roleLevelService.roleLevel$.subscribe(data => {
      if (data.menuItems) {
        this.useRoleLevel(data.menuItems);
        if (localStorage.getItem("email")) {
          this.email = localStorage.getItem("email") ?? "";
        }
        if (localStorage.getItem("userName")) {
          this.username = localStorage.getItem("userName") ?? "";
        }

      }
    });
  }


  useRoleLevel(data: any[]) {
    this.menuItems = data.map(item => this.mapToMenuItem(item));
  }

  mapToMenuItem(item: any): MenuItem {
    const isLogout = item.label?.toLowerCase() === 'logout';

    const menuItem: MenuItem = {
      icon: item.icon,
      label: item.label,
      route: item.route
    };

    if (!isLogout) {
      menuItem.isOpen = item.isOpen ?? false;
      menuItem.children = item.children?.map((child: any) => this.mapToMenuItem(child)) ?? [];
    }

    return menuItem;
  }

  toggleSidebar() {
    console.log("toggleSidebar");

    this.sidebarToggle.emit();
  }

  toggleMenuItem(item: MenuItem) {
    if (!this.isSidebarCollapsed && item.children) {
      item.isOpen = !item.isOpen;
    }
  }

  navigateToChild(child: MenuItem) {
    console.log("child", child);

    if (child.route) {
      this.router.navigate(['/dashboard', child.route]);
    }
  }

  navigateToItem(item: MenuItem) {
    if (item.label === 'Logout') {
      this.handleLogout();
      return;
    }

    if (item.route) {
      this.router.navigate([item.route]);
    }
  }


  handleLogout() {
    Swal.fire({
      title: 'คำเตือน',
      text: 'คุณต้องการออกจากระบบหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ออกจากระบบ',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('Role');
        this.router.navigate(['/login']);
      }
    });


  }



}

interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

