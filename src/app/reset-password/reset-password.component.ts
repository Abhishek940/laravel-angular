import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;
  token: any;

  constructor(private AuthService: AuthService, private fb: FormBuilder,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.resepasstForm();

    this.route.params.subscribe(params => {
      this.token = params['token'];
     
    
  });
  }

  resepasstForm(): void {
    this.resetForm = this.fb.group({
      email: [''],
      password:[''],
      token:[''],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
     
    
    });
  }
  onSubmit() {

    if (this.resetForm.get('email')?.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Required',
        text: 'UserId is required.',
      });
    } else if (this.resetForm.get('password_confirmation')?.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Required',
        text: 'confirmPassword is required.',
      });
    }
    if (this.resetForm.valid) {
      const { email, password,password_confirmation } = this.resetForm.value;
      const token = this.token; 
  
      this.AuthService.resetPassword(email, token, password,password_confirmation).subscribe(
          (res: any) => {
            Swal.fire({
              icon: 'success',
              title: res.msg ,
            }).then(() => {
              this.router.navigate(['/']);
            });
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: error.error.msg,
            });
          }
        );
    }
  }
  


}
