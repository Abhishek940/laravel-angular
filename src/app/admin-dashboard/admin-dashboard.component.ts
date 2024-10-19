import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  isAdmin: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
   ) {}

   ngOnInit(): void {
  
  }

  logout(): void {
    this.authService.logout().subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Logout successful',
          text: 'You have been logged out successfully.'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        console.error('Logout failed:', error);
        Swal.fire({
          icon: 'error',
          title: 'Logout failed',
          text: 'An error occurred while logging out. Please try again later.'
        });
      }
    );
  }

}
