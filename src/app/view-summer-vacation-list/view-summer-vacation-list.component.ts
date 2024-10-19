import { Component } from '@angular/core';
import { InspectionServicesService } from '../services/inspection-services.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-view-summer-vacation-list',
  templateUrl: './view-summer-vacation-list.component.html',
  styleUrls: ['./view-summer-vacation-list.component.css']
})
export class ViewSummerVacationListComponent {

  resultListData : any;
  isNorecordFound: boolean = false;

  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  constructor(
    public InspectionServicesService: InspectionServicesService,
    private router: Router,   
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getsummerVacationList();
  }

  getsummerVacationList() {
    this.spinner.show();
    this.InspectionServicesService.getsummerVacationList().subscribe({
      next: (res: any) => {
        console.log(res);
        this.resultListData = res.data;
        //  console.log(this.resultListData);
        this.isNorecordFound = this.resultListData.length === 0;
        this.spinner.hide();
      },
      error: (error: any) => {
       this.spinner.hide();
      },
    });
  }

  
onTableDataChange(event: any) {
    this.page = event;
    this.getsummerVacationList();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getsummerVacationList();
  }
  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
     // this.spinner.hide();
    }, 3000); // Hide spinner after 3 seconds
  }
  deleteSummerVacationData(id: any) {
    // console.log(id);
     Swal.fire({
       title: 'Are you sure?',
       text: 'You want to submit the form?',
       icon: 'question',
       showCancelButton: true,
       confirmButtonText: 'Yes, submit it!',
       cancelButtonText: 'No, cancel!',
     }).then((result) => {
       if (result.isConfirmed) {
         this.InspectionServicesService.deleteSummerVacationData(id).subscribe({
           next: (res: any) => {
             let msg = res.msg;
             Swal.fire(
               'Submitted!',
               ' Configuration deleted successfully.',
               'success'
             ).then(() => {
               this.router.navigate(['/ViewInspectionConfigrationComponent']);
             });
           },
           error: (error: any) => {
             Swal.fire('Error', 'something Went Wrong.', 'error');
           },
         });
       } else if (result.dismiss === Swal.DismissReason.cancel) {
         Swal.fire(
           'Cancelled',
           'Your form submission was cancelled :)',
           'error'
         );
       }
     });
   }

}
