import { Component} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-change-password',
 // standalone: true,
  //imports: [],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  //changePasswordForm!:FormGroup;

  changePasswordForm!:any;
   //currentPassword:any;
  //newPassword:any;
 // password_confirmation:any;
  constructor(
    public AuthService: AuthService,
    private router:Router,
    private formBuilder: FormBuilder,
         
  )  {} 

  ngOnInit(): void {

    this.changePasswordForm=this.formBuilder.group({
      currentPassword: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    
    });
  
  }
  onSubmit(){

      if (this.changePasswordForm.get('currentPassword').invalid) {
          Swal.fire({
              icon: 'error',
              text: 'Current Password is Required.',
          });
          return;
      }
  
      if (this.changePasswordForm.get('new_password').invalid) {
          Swal.fire({
              icon: 'error',
              text: 'New Password is required'
          });
          return;
      }
  
      const newPassword = this.changePasswordForm.get('new_password').value;
      const confirmPassword = this.changePasswordForm.get('password_confirmation').value;
  
      if (newPassword !== confirmPassword) {
          Swal.fire({
              icon: 'error',
              text: 'New Password and Confirm Password must match.'
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
              this.AuthService.changePassword( this.changePasswordForm.value.currentPassword,
                this.changePasswordForm.value.new_password,
                this.changePasswordForm.value.password_confirmation)
                  .subscribe({
                      next: (res: any) => {
                          let msg = res.msg;
                          Swal.fire('Submitted!', msg, 'success').then(() => {
                              this.changePasswordForm.reset();
                              this.router.navigate(['/user/changePassword']);
                          });
                      },
                      error: (error: any) => {
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

  onReset() {
    this.changePasswordForm.reset();
  }

}
