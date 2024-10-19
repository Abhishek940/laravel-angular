import { Component,ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormGroup,Validators} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-view-user-list',
  templateUrl: './view-user-list.component.html',
  styleUrls: ['./view-user-list.component.css']
})
export class ViewUserListComponent {
  @ViewChild('userForm') userForm!: NgForm;
  resultListData: any[] = [];
  isNorecordFound: boolean = false;
  imageUrl: string | ArrayBuffer | null = null;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  updateregistration!: FormGroup;
  userId: any;
  imagePreview: any;
  removedRows: number[] = [];
  rowId:any;
  firstAddMoreClicked: boolean = false;
  roleData: any[] =[];
  role: string | null = '';
  isLoading = false;
   //role_id: any | null=;
   searchData = false;
   selectedIds:any[]= [];
  constructor(
    public AuthService: AuthService,
    private router: Router,   
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.getRole();
    this.updateregistration=this.formBuilder.group({
      id:[''],
      name:[''],
      fname:[''],
      mobileno:[''],
      email:[''],
      image:[''],
     // gender:[''],
      role_id:[''],
      address:[''],
      dynamicRows: this.formBuilder.array([
        this.createRow() // Initially add one row
      ])
     
    });
  
  }
 
  get dynamicRows() {
    return this.updateregistration.get('dynamicRows') as FormArray;
  }

  /*  addMoreRows() {
    this.dynamicRows.push(this.createRow());
  }  */

  addMoreRows() {
    if (!this.firstAddMoreClicked) {
      this.dynamicRows.push(this.createRow());
      this.firstAddMoreClicked = true;
    } else {
      this.dynamicRows.push(this.createRow());
    }
  }
  

  createRow(): FormGroup {
    return this.formBuilder.group({
      id:[''],
      company_name: [''],
      designation: [''],
      fromDate:[''],
      toDate:['']
    });
  }

 
 /*  removeRow(index: number) {
    this.dynamicRows.removeAt(index);
  } */
  /* removeRow(index: any) {
    this.removedRows.push(index);
    this.dynamicRows.removeAt(index);
   
  } */

  removeRow(index: number) {
    const row = this.dynamicRows.at(index) as FormGroup;
    const id = row.get('id')?.value;
    if (id !== null) {
        this.removedRows.push(id);
       }
    this.dynamicRows.removeAt(index);
}


/* onSearch(){
  let data = {
    role:this.role,
  
};
this.searchRoleData(data);
} */

//searchRoleData(role: any){
  onSearch(){
  this.spinner.show(); 
  this.AuthService.searchRole(this.userForm.value.role).subscribe({
    next: (res: any) => {
      this.spinner.hide(); 
     // this.resultListData = res.data;
      this.resultListData = (res.data as any[]).map((data) => ({
        ...data,role: data.role_id || '' 
      }));
      this.isNorecordFound = this.resultListData.length === 0;
      this.isLoading = false;
     // this.searchData = true; 
      if (this.isNorecordFound) {
        Swal.fire({
          icon: 'info',
          title: 'No Records Found',
          text: 'No records found.'
        });
      }
    },
    error: (error: any) => {
      // Hide spinner in case of error
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


  getUserData() {
    this.spinner.show();
    this.AuthService.getUserData().subscribe({
      next: (res: any) => {
      //  console.log(res);
       // this.resultListData = res.data;
        //  console.log(this.resultListData);
       // this.resultListData = res.data.map(data => ({
        this.resultListData = (res.data as any[]).map((data) => ({
          ...data,role: data.role_id || '' 
        }));
        this.spinner.hide();
      },
      error: (error: any) => {
       this.spinner.hide();
      },
    });
  }

  getImageUrl(imagePath: string): string {
   
    return `http://localhost:8000/${imagePath}`;
}

  
getRole(){
  this.spinner.show();
    this.AuthService.getUserRole().subscribe({
      next:(res:any)=>{
        this.roleData=res.data;
        this.spinner.hide();
      },
      error:(error:any) => {
        this.spinner.hide();
      },
    });
  }

editUserData(id: number): void {
  this.AuthService.getUserDataById(id).subscribe({
    next: (res: any) => {
      let userData = res.data[0];
       const previousOrganization = userData.previousOrganization; 
        this.updateregistration.patchValue({
        id: userData.id,
        name: userData.name,
        fname: userData.fname,
        mobileno: userData.mobileno,
        email: userData.email,
        address: userData.address,
        role_id: userData.role_id || '',
      });

      this.imagePreview = `http://localhost:8000/${userData.image}`;
       const dynamicRowsArray = this.updateregistration.get('dynamicRows') as FormArray;
        dynamicRowsArray.clear();

       
        if (userData.previousOrganization) {
          userData.previousOrganization.forEach((data: any) => {
            dynamicRowsArray.push(this.formBuilder.group({
              id:data.id,
              company_name: data.company_name,
              designation: data.designation,
              fromDate: data.fromDate,
              toDate: data.toDate
            }));
          });
        }

    },
    
  });
}


handleImageInput(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
   // console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

onFileChange(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    console.log(file);
     
  }
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
    
     const formData = new FormData();
            formData.append('id', this.updateregistration.get('id')?.value);
            formData.append('name', this.updateregistration.get('name')?.value);
            formData.append('fname', this.updateregistration.get('fname')?.value);
            formData.append('mobileno', this.updateregistration.get('mobileno')?.value);
            formData.append('email', this.updateregistration.get('email')?.value);
            formData.append('address', this.updateregistration.get('address')?.value);
            formData.append('role_id',this.updateregistration.get('role_id')?.value);
            
           const fileInput = document.getElementById('imageInput') as HTMLInputElement;
            if (fileInput.files && fileInput.files.length > 0) {
              formData.append('image', fileInput.files[0]);
            }

            const dynamicRowsArray = this.updateregistration.get('dynamicRows') as FormArray;

            for (let i = 0; i < dynamicRowsArray.length; i++) {
              const rowGroup = dynamicRowsArray.at(i) as FormGroup;
              formData.append(`dynamicRows[${i}][id]`, rowGroup.get('id')?.value);
              formData.append(`dynamicRows[${i}][company_name]`, rowGroup.get('company_name')?.value);
              formData.append(`dynamicRows[${i}][designation]`, rowGroup.get('designation')?.value);
              formData.append(`dynamicRows[${i}][fromDate]`, rowGroup.get('fromDate')?.value);
              formData.append(`dynamicRows[${i}][toDate]`, rowGroup.get('toDate')?.value);
            }
        // Append removedRows to FormData
        formData.append('removedRows', this.removedRows.join(','));

            
      this.AuthService.updateUserData(formData,)
        .subscribe({
          next: (res: any) => {
            let msg = res.msg;
            Swal.fire('Submitted!', msg, 'success').then(() => {
              this.hideModal();
              this.router.navigate(['/viewUser']);
            });
          },
          error: (error: any) => {
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

hideModal() {
  const modal = document.getElementById('myModal');
  if (modal) {
    modal.classList.remove('show'); // Remove the 'show' class to hide the modal
    modal.setAttribute('aria-hidden', 'true');
    
    // Also hide the modal overlay
    const modalOverlay = document.getElementsByClassName('modal-backdrop')[0];
    if (modalOverlay) {
      modalOverlay.classList.remove('show');
      modalOverlay.remove(); // Remove the modal overlay element
    }
  }
}


onTableDataChange(event: any) {
    this.page = event;
    this.getUserData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getUserData();
  }


  selectAll(event: Event) {
    if (event && event.target) {
      const target = event.target as HTMLInputElement;
      this.resultListData.forEach(data => data.selected = target.checked);
    }
  }

 // update multiple user role
updateSelectedRoles() {

  const selectedUsers = this.resultListData.filter(data => data.selected);

  if (selectedUsers.length === 0) {
    Swal.fire({
      title: 'Error',
      text: 'Please select at least one checkbox.',
      icon: 'error',
      confirmButtonText: 'OK'
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

  const selectedUsers = this.resultListData.filter(data => data.selected);
 // const userRoleData = selectedUsers.map(user => ({ userId: user.id, roleId: user.role_id }));

    const userRoleData = selectedUsers.map(user => ({
      userId: user.id,
      roleId: user.role_id
    }));
   
   // console.log(userRoleData);
  this.AuthService.updateMultipleUserRoles(userRoleData)
        .subscribe({
          next: (res: any) => {
            let msg = res.msg;
            Swal.fire('Submitted!', msg, 'success').then(() => {
             this.router.navigate(['/user/viewUser']);
            });
          },
          error: (error: any) => {
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



showSpinner() {
  this.spinner.show();
  setTimeout(() => {
   // this.spinner.hide();
  }, 3000); // Hide spinner after 3 seconds
}



  

}

