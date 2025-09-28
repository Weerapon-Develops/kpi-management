import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { RoleLevelService } from '@services/role-level.service';

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

  constructor(
    private router: Router,
    private roleLevelService: RoleLevelService
  ) { }

  ngOnInit() {
    this.roleLevelService.fetchRoleLevel();
    this.roleLevelService.roleLevel$.subscribe(data => {
      if (data) {
        this.useRoleLevel(data);
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


  //Mocup
  // menuItems: MenuItem[] = [
  //   {
  //     icon: 'fa-solid fa-folder-open',
  //     label: 'Master',
  //     isOpen: false,
  //     children: [
  //       { icon: 'fa-solid fa-circle-user', label: 'Account', route: 'account' },
  //       { icon: 'fa-solid fa-users', label: 'ManageRole', route: 'account/projects' }
  //     ]
  //   },
  //   {
  //     icon: 'fa-solid fa-list-ul',
  //     label: 'Transaction',
  //     isOpen: false,
  //     children: [
  //       { icon: 'fa-solid fa-clipboard-check', label: 'KPI', route: 'kpi' },
  //       { icon: 'fa-solid fa-clipboard-check', label: 'Work Performance', route: 'settings/security' }
  //     ]
  //   },
  //   {
  //     icon: 'fa-solid fa-right-from-bracket',
  //     label: 'Logout',
  //     route: '/login'
  //   }
  // ];


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
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }



}

interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

