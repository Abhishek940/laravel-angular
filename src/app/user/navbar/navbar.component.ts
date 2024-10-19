import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isSidebarOpen: boolean = false;
  isAdmin: boolean = false;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  constructor(private router: Router) {}
  ngOnInit() {
    this.checkUserRole();
   
  }
  checkUserRole() {
    let roleName = localStorage.getItem('roleName');
       if (roleName === 'superAdmin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
