import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponentComponent  {
  localStorageValue!: any;
  pieChart: any;
  resultListData : any;
  userData: any;
  constructor(
    private AuthService: AuthService,
    private router: Router,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
   
   ) { this.localStorageValue = localStorage.getItem('roleName');}


   ngOnInit(): void {
   // this.generatePieChart();
   this.getUserData();
   }
  

  
  getUserData() {
  //  this.spinner.show();
    this.AuthService.getUserData().subscribe({
      next: (res: any) => {
        this.userData = res.data;
        this.generatePieChart();
        this.spinner.hide();
      },
      error: (error: any) => {
      // this.spinner.hide();
      },
    });
  }


  generatePieChart(): void {
    /* if (this.pieChart) {
      this.pieChart.destroy();
    } */
  
   /*  if (!this.userData) {
      console.error('User data not available.');
      return;
    } */
  
    const totalUsers = this.userData.length;
  
    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['User Registered', 'Unregistered'],
        datasets: [{
          label: 'Pie Chart',
          data: [totalUsers, 0], 
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  

  logout(): void {
    this.AuthService.logout().subscribe(
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

