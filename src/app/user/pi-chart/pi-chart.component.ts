import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pi-chart',
  standalone: true,
  imports: [],
  templateUrl: './pi-chart.component.html',
  styleUrls: ['./pi-chart.component.css']
})
export class PiChartComponent {
  pieChart: any;

  constructor(
   
   ) { }

   ngOnInit(): void {
    this.generatePieChart();
  }
  generatePieChart() {
    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [{
          label: 'Pie Chart',
          data: [30, 20, 50], // Example data
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
