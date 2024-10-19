import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  localStorageValue: any='';
  localStorageusername:any='';
  pieChart: any;
  constructor(
    private authService: AuthService,
    private router: Router,
   ) {
     this.localStorageValue = localStorage.getItem('roleName');
     //this.localStorageusername =localStorage.getItem('username');
   }

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
