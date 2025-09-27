import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';

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

  constructor(
    private router: Router
  ) { }

  menuItems: MenuItem[] = [
    {
      icon: 'fas fa-home',
      label: 'Master',
      isOpen: false,
      children: [
        { icon: 'fas fa-chart-pie', label: 'account', route: 'account' },
        { icon: 'fas fa-tasks', label: 'ManageRole', route: 'account/projects' }
      ]
    },
    {
      icon: 'fas fa-cog',
      label: 'Transaction',
      isOpen: false,
      children: [
        { icon: 'fas fa-user', label: 'kpi', route: 'kpi' },
        { icon: 'fas fa-lock', label: 'Security', route: 'settings/security' }
      ]
    },
    {
      icon: 'fas fa-envelope',
      label: 'Messages',
      route: '/messages'
    }
  ];


  toggleSidebar() {
    console.log("toggleSidebar");

    this.sidebarToggle.emit();
  }

  // toggleMenuItem(item: MenuItem) {
  //   console.log("item", item.children);

  //   if (!this.isSidebarCollapsed && item.children) {
  //     item.isOpen = !item.isOpen;
  //     console.log(item.children);
  //     const targetRoute = item.children[0].route;
  //     console.log(targetRoute);

  //     if (targetRoute) {
  //       this.router.navigate(['/dashboard', item.children[0].route]);

  //     }
  //   }
  // }

  toggleMenuItem(item: MenuItem) {
  if (!this.isSidebarCollapsed && item.children) {
    item.isOpen = !item.isOpen;
  }
}

navigateToChild(child: MenuItem) {
  console.log("child",child);

  if (child.route) {
    this.router.navigate(['/dashboard', child.route]);
  }
}



  ngOnInit() {
  }

}

interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

