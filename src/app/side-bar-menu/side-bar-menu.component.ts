import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.css']
})
export class SideBarMenuComponent {

  isSidebarOpen: boolean = false;
  isAdmin: boolean = false;
 role:any;
  userData: any;
  constructor(private authService: AuthService) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  
  ngOnInit(): void {
   
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
