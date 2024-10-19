import { Component,ViewChild, ElementRef,Renderer2 } from '@angular/core';
import { InspectionServicesService } from '../services/inspection-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-view-inspection-configration',
  templateUrl: './view-inspection-configration.component.html',
  styleUrls: ['./view-inspection-configration.component.css']
})
export class ViewInspectionConfigrationComponent {
  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('myModal2') myModal2!: ElementRef;
  resultListData: any;
  isNorecordFound: boolean = false;
  isLoading = false;
  isStatus: string | null = '';
  endDate: any = Date;
  startDate: any = Date;
  configrationData = false;

  isModalOpen: boolean = false;
  status: string='';
  popupRef: any;
  startDateFieldVisible: boolean = false;
  endDateFieldVisible: boolean = false;
  reasonFieldVisible: boolean = false;
  selectedStatus: string = '';
  deactivationReason: string = '';
  myModalId: string = ''; 
  formData: any = {
    moduleName: '',
    isStatus: '',
    startDate: '',
    endDate: '',
    reason: '',
  };
config: any;
    constructor(
    public InspectionServicesService: InspectionServicesService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private renderer: Renderer2
  ) {}

  
  ngOnInit(): void {
    this.config = { isStatus: 1 };
   //this.getConfigrationData();
  /*  this.route.params.subscribe(params => {
    const id = params['id']; 
    this.editConfigrationData(id);
    if (this.formData && this.formData[0] && this.formData[0].isStatus === '2') {
        this.onStatusChange();
    }
}); */

this.resultListData.forEach((config: { InspectionConfigrationId: string | number; isStatus: any; }) => {
  this.formData[config.InspectionConfigrationId] = { isStatus: config.isStatus };
});
    
  }
  updateFormData(id: number, status: string) {
    this.formData[id].isStatus = status;
  }
  /* onStatusChange() {
    if (this.selectedStatus === '1') {
      this.deactivationReason = ''; // Reset reason for deactivation
    } else if (this.selectedStatus === '2') {
      this.startDate = ''; // Reset start date
      this.endDate = ''; // Reset end date
    }
  } */

  onStatusChange() {
    console.log('Status:', this.formData.isStatus);
    if (this.formData.isStatus === 1) {
      this.formData.reason = ''; 
    } else if (this.formData.isStatus === 2) {
      this.formData.startDate = ''; 
      this.formData.endDate = ''; 
    }
  }
  
  CharOnly(event: any) {
    const key = event.keyCode;
    return (key < 48 || key > 57) && key !== 8 && key !== 46;
  }
  

   getConfigrationData() {
    this.spinner.show();
     this.InspectionServicesService.getConfigrationData().subscribe({
      next: (res: any) => {
       // console.log(res);
        this.resultListData = res.data; 
      //  console.log(this.resultListData);
        this.isNorecordFound = this.resultListData.length === 0; 
        this.spinner.hide();
       },
      
    });
  }


  onSearch() {

    if (!this.startDate) {
        Swal.fire({
          icon: 'error',
          text: 'start Date is required.',
        });
        return;
      
    } else if (!this.endDate) {
      Swal.fire({
        icon: 'error',
        text: 'endDate is required.',
      });
      return;
    }
    const data = {
        isStatus:this.isStatus,
        startDate: this.startDate,
        endDate: this.endDate
    };
   // console.log(data);
    this.searchConfigrationData(data);
}

searchConfigrationData(post: any) {
  this.spinner.show(); // Show spinner 
  this.InspectionServicesService.searchConfigrationData(post).subscribe({
    next: (res: any) => {
      this.spinner.hide(); 
      this.resultListData = res.data;
      this.isNorecordFound = this.resultListData.length === 0;
      this.isLoading = false;
      this.configrationData = true; 
      if (this.isNorecordFound) {
        Swal.fire({
          icon: 'info',
          title: 'No Records Found',
          text: 'No records found.'
        });
      }
    },
    error: (error: any) => {
        this.spinner.hide();
      if (error.error && error.error.msg) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.msg
        });
      }
      this.isLoading = false;
    }
  });
}


 editConfigrationData(id: number): void {
  //this.spinner.show();
  this.InspectionServicesService.getConfigrationDataById(id).subscribe({
    next: (res: any) => {
      //console.log('Response:', res);
      // this.formData = res.data;
      this.formData = res.data.length > 0 ? res.data[0] : {};
    //  this.spinner.hide();
      
    },
    
  });
} 

/* editConfigrationData(id: number): void {
  this.InspectionServicesService.getConfigrationDataById(id).subscribe({
    next: (res: any) => {
     // console.log('Response:', res);
      // this.formData = res.data;
      this.formData = res.data.length > 0 ? res.data[0] : {};
     // console.log('formData', this.formData);
      if (!this.formData || this.formData.length === 0) {
        //console.error('No data found or formData is empty.');
      } else {
       // console.log('Form data retrieved successfully.');
        this.isNorecordFound = false;
        this.isLoading = false;
      }
    },
    error: (error: any) => {
      console.error('Error:', error);
      this.isLoading = false;
    },
  });
} */


/*
onSubmit(): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to submit the form?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, submit it!',
    cancelButtonText: 'No, cancel!',
  }).then((result) => {
    if (result.isConfirmed) {
      this.spinner.show();
      this.InspectionServicesService.updateConfigrationData(this.formData)
        .subscribe({
          next: (res: any) => {
            let msg = res.msg;
            Swal.fire('Submitted!', msg, 'success').then(() => {
              this.hideModal(); // Hide the modal after successful submission
            });
          },
          error: (error: any) => {
            console.log('API Response Error:', error);
            Swal.fire('Error', error.error.msg, 'error');
          },
          complete: () => {
            this.spinner.hide(); // Hide the spinner regardless of success or error
          }
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


hideModal(): void {
  if (this.myModal) {
    const modal = this.myModal.nativeElement;
    this.renderer.setStyle(modal, 'display', 'none');
    this.renderer.removeClass(document.body, 'modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      document.body.removeChild(modalBackdrop);
    }
  } else if (this.myModal2) {
    const modal = this.myModal2.nativeElement;
    this.renderer.setStyle(modal, 'display', 'none');
    this.renderer.removeClass(document.body, 'modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      document.body.removeChild(modalBackdrop);
    }
  } else {
    console.error('error.');
  }
}

*/

onSubmit(modalId: string): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to submit the form?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, submit it!',
    cancelButtonText: 'No, cancel!',
  }).then((result) => {
    if (result.isConfirmed) {
      this.spinner.show();
      this.InspectionServicesService.updateConfigrationData(this.formData)
        .subscribe({
          next: (res: any) => {
            let msg = res.msg;
            Swal.fire('Submitted!', msg, 'success').then(() => {
              this.hideModal(modalId); 
            });
          },
          error: (error: any) => {
            console.log('API Response Error:', error);
            Swal.fire('Error', error.error.msg, 'error');
          },
          complete: () => {
            this.spinner.hide(); 
          }
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

hideModal(modalId: string): void {
  const modalElement = document.querySelector(`#${modalId}`);
  if (modalElement) {
    modalElement.classList.remove('show'); // Remove the 'show' class
    modalElement.setAttribute('aria-hidden', 'true'); // Set aria-hidden attribute to 'true'
    const backdropElement = document.querySelector('.modal-backdrop');
    if (backdropElement) {
      backdropElement.remove(); // Remove the modal backdrop
    }
  } else {
    console.error(`Modal ${modalId} not found.`);
  }
}



navigateToView() {
  this.router.navigate(['/ViewInspectionConfigrationComponent']);
}

resetForm() {
  this.formData.moduleName = '';
  this.formData.isStatus = '';
  this.formData.startDate = '';
  this.formData.endDate = '';
  this.formData.reason = '';
}
showSpinner() {
  this.spinner.show();
  setTimeout(() => {
   // this.spinner.hide();
  }, 3000); // Hide spinner after 3 seconds
}

  deleteConfigration(id: any) {
   // console.log(id);
     Swal.fire({
       title: 'Are you sure?',
       text: 'You want to submit the form?',
       icon: 'question',
       showCancelButton: true,
       confirmButtonText: 'Yes, submit it!',
       cancelButtonText: 'No, cancel!'
     }).then((result) => {
       if (result.isConfirmed) {
         this.InspectionServicesService.deleteConfigrationData(id)
           .subscribe({
             next: (res: any) => {
              let msg = res.msg;
               Swal.fire('Submitted!', ' Configuration deleted successfully.', 'success')
               .then(() => {
                 this.router.navigate(['/ViewInspectionConfigrationComponent']);
               }); 
             },
             error: (error: any) => {
              
               Swal.fire('Error', 'something Went Wrong.', 'error');
             }
           });
       } else if (result.dismiss === Swal.DismissReason.cancel) {
         Swal.fire('Cancelled', 'Your form submission was cancelled :)', 'error');
       }
     });
  
 }
}

