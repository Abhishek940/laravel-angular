import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPassForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,

    ) {}

  ngOnInit(): void {
    this.forgotPass();
  }
  forgotPass(): void {
    this.forgotPassForm = this.fb.group({
      email: [''],
    
    });
  }

  onSubmit(){
  
    if (this.forgotPassForm.get('email')?.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Required',
        text: 'UserId is required.',
      });
    }
    if (this.forgotPassForm.valid) {
      const email = this.forgotPassForm.value;

      this.authService.sendPassRestMail(email).subscribe(
        (res: any) => {
            Swal.fire({
            icon: 'success',
            title: 'Reset password link sent to Email',
           
          })
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Invalid UserId',
          
          });
        }
      );
    }

  }

}
