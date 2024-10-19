import { Component,ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
declare var CKEDITOR: any;
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  isNorecordFound: boolean = false;
  firstAddMoreClicked: boolean = false;
  formData: any = {
    name: '' ,
    fname:'',
    mobileno:'',
    image:'',
    email:'',
    gender:'',
    address:'',
    role_id:'',
    description:''
   
};

registration: any;
  //formData:any;
  resultListData: any[] = [];
  roleData:any[]=[];
  role:any;
  isLoading: boolean =true;
  editorValue: any;
  form: any;
  imageSrc: string='';

  Editorconfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(
    public AuthService: AuthService,
    private router:Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private el: ElementRef,
          
  )  {} 
  
  
  ngOnInit(): void {
    this.getRole();
   this.registration=this.formBuilder.group({
      name:['', Validators.required],
      fname:['',Validators.required],
      mobileno:['',Validators.required],
      image:['',Validators.required],
      email:['',Validators.required],
      gender:['',Validators.required],
      role_id:['',Validators.required],
      address:['',Validators.required],
      dynamicRows: this.formBuilder.array([
        this.createRow() // Initially add one row
      ])
      
    });

    CKEDITOR.replace('editor');

  }
  
getRole(){
this.spinner.show();
  this.AuthService.getUserRole().subscribe({
    next:(res:any)=>{
      this.roleData=res.data;
      //console.log(this.roleData);
      this.spinner.hide();
    },
    error:(error:any) => {
      this.spinner.hide();
    },
  });
}
  

getUserData() {
  this.spinner.show();
  this.AuthService.getUserData().subscribe({
    next: (res: any) => {
    //  console.log(res);
      this.resultListData = res.data;
      //  console.log(this.resultListData);
      this.spinner.hide();
    },
    error: (error: any) => {
     this.spinner.hide();
    },
  });
}


  NumericValue(event:any) {
  const key = event.keyCode;
  return (key >= 48 && key <= 57) || key === 8 || key === 46;
}


onFileChange(event: any) {
  // without image preview
  /* if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
   
  } */

    //with image preview
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
      this.imageSrc = reader.result as string;
        this.registration.patchValue({
          file: reader.result as string
        });
     
      };
   
    }
}

  get dynamicRows() {
    return this.registration.get('dynamicRows') as FormArray;
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
      company_name: ['', Validators.required],
      designation: ['', [Validators.required]],
      fromDate:['',[Validators.required]],
      toDate:['',[Validators.required]]
    });
  }

 
  removeRow(index: number) {
    this.dynamicRows.removeAt(index);
  }

  onSubmit(){

        if (this.registration.get('name').invalid) {
          Swal.fire({
            icon: 'error',
            text: 'Name is Required.',
        });
        return; 
      }

        if(this.registration.get('fname').invalid){
          Swal.fire({
            icon:'error',
            text:'Father Name is required'
          });
          return;
        }

        Swal.fire({
          title: 'Are you sure?',
          text: 'You want to submit the form?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, submit it!',
          cancelButtonText: 'No, cancel!'
        }).then((result) => {
          if (result.isConfirmed) {
            //const formData = this.registration.value;
            //console.log('formData');
            const formData = new FormData();
            formData.append('name', this.registration.get('name').value);
            formData.append('fname', this.registration.get('fname').value);
            formData.append('mobileno', this.registration.get('mobileno').value);
            formData.append('email', this.registration.get('email').value);
            formData.append('gender', this.registration.get('gender').value);
            formData.append('address', this.registration.get('address').value);
            formData.append('role_id',this.registration.get('role_id').value);
          
          
            const fileInput = document.getElementById('imageInput') as HTMLInputElement;
            if (fileInput.files && fileInput.files.length > 0) {
               formData.append('image', fileInput.files[0]);
            }

            const dynamicRowsArray = this.registration.get('dynamicRows') as FormArray;

            for (let i = 0; i < dynamicRowsArray.length; i++) {
              const rowGroup = dynamicRowsArray.at(i) as FormGroup;
              formData.append(`dynamicRows[${i}][company_name]`, rowGroup.get('company_name')?.value);
              formData.append(`dynamicRows[${i}][designation]`, rowGroup.get('designation')?.value);
              formData.append(`dynamicRows[${i}][fromDate]`, rowGroup.get('fromDate')?.value);
              formData.append(`dynamicRows[${i}][toDate]`, rowGroup.get('toDate')?.value);
            }

           this.AuthService.addUser(formData).subscribe({
                next: (res: any) => {
                  let msg = res.msg;
                  Swal.fire('Submitted!', msg, 'success').then(() => {
                    this.router.navigate(['/user/viewUser']);
                  });
                },
                error: (error: any) => {
                  console.log('api:', error.error.msg);
                  Swal.fire('Error', error.error.msg, 'error');
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

}
