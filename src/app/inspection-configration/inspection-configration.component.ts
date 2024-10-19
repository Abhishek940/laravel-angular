import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { InspectionServicesService } from '../services/inspection-services.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-inspection-configration',
  templateUrl: './inspection-configration.component.html',
  styleUrls: ['./inspection-configration.component.css']
})
export class InspectionConfigrationComponent {

  formBuilder: any;
  inspectionForm!: NgForm;
  selectedStatus: string = '';
  moduleName: string = '';
  startDate: string = '';
  endDate: string = '';
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
    private router: Router
  ) {}

  ngOnInit(): void {}

  NumericValue(event: any) {
    const key = event.keyCode;
    return (key < 48 || key > 57) && key !== 8 && key !== 46;
  }

  onSubmit(): void {
    if (!this.formData.moduleName.trim()) {
      Swal.fire({
        icon: 'error',
        text: 'Inspection Name is Required.',
      }).then(() => {
        if (this.moduleNameInput && this.moduleNameInput.nativeElement) {
          this.moduleNameInput.nativeElement.focus();
        }
      });
      return;
    }

    if (!this.formData.isStatus) {
      Swal.fire({
        icon: 'error',
        text: 'Status is Required.',
      });
      return;
    }

    if (this.formData.isStatus === '1') {
      if (!this.formData.startDate) {
        Swal.fire({
          icon: 'error',
          text: 'Start Date is required.',
        });
        return;
      }
    }
    if (this.formData.isStatus === '1') {
      if (!this.formData.endDate) {
        Swal.fire({
          icon: 'error',
          text: 'End Date is required.',
        });
        return;
      }
    } else if (this.formData.isStatus === '2' && !this.formData.reason) {
      Swal.fire({
        icon: 'error',
        text: 'Reason is required.',
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to submit the form?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.InspectionServicesService
          .addConfigration(this.formData)
          .subscribe({
            next: (res: any) => {
              console.log('api:', res);
              let msg = res.msg;
              console.log(msg);
              Swal.fire('Submitted!', msg, 'success').then(() => {
                this.resetForm();
                this.router.navigate(['/ViewInspectionConfigrationComponent']);
              });
            },
            error: (error: any) => {
              console.log('api:', error.error.msg);
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
