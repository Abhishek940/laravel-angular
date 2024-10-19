import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { InspectionServicesService } from '../services/inspection-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-inspection-configration',
  templateUrl: './edit-inspection-configration.component.html',
  styleUrls: ['./edit-inspection-configration.component.css']
})
export class EditInspectionConfigrationComponent {

  formBuilder: any;
  inspectionForm!: NgForm;
  selectedStatus: string = '';
  moduleName: string = '';
  startDate: string = '';
  endDate: string = '';
  //reason: string;
  deactivationReason: string = '';
  moduleNameInput: any;
  resultListData: any;
  isNorecordFound: boolean = false;
  isLoading = false;

  formData: any = {
    moduleName: '',
    isStatus: '',
    startDate: '',
    endDate: '',
    reason: '',
  };

  constructor(
    public InspectionServicesService: InspectionServicesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']; 
      this.editConfigrationData(id);
      if (this.formData && this.formData[0] && this.formData[0].isStatus === '2') {
          this.onStatusChange();
      }
  });
  }

  CharOnly(event: any) {
    const key = event.keyCode;
    return (key < 48 || key > 57) && key !== 8 && key !== 46;
  }

  editConfigrationData(id: number): void {
    this.InspectionServicesService.getConfigrationDataById(id).subscribe({
      next: (res: any) => {
    //    console.log('Response:', res);
        // this.formData = res.data;
        this.formData = res.data.length > 0 ? res.data[0] : {};
        console.log('formData', this.formData);
        if (!this.formData || this.formData.length === 0) {
         // console.error('No data found or formData is empty.');
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
  }

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
        this.InspectionServicesService.updateConfigrationData(
          this.formData
        ).subscribe({
          next: (res: any) => {
            let msg = res.msg;
            Swal.fire('Submitted!', msg, 'success').then(() => {
              this.resetForm();
              this.router.navigate(['/ViewInspectionConfigration']);
            });
          },
          error: (error: any) => {
            console.log('API Response Error:', error);
            Swal.fire('Error', error.error.msg, 'error');
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

  navigateToView() {
    this.router.navigate(['/ViewInspectionConfigrationComponent']);
  }

  onStatusChange() {
    if (this.selectedStatus === '1') {
      this.deactivationReason = ''; // Reset reason for deactivation
    } else if (this.selectedStatus === '2') {
      this.startDate = ''; // Reset start date
      this.endDate = ''; // Reset end date
    }
  }

  resetForm() {
    this.formData.moduleName = '';
    this.formData.isStatus = '';
    this.formData.startDate = '';
    this.formData.endDate = '';
    this.formData.reason = '';
  }
}

