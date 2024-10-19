import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  loginForm!: FormGroup;
  isLoggedIn: boolean = false;
  showForgotPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.LoginForm();
  }

    LoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

 /*  toggleForgotPassword() {
    this.router.navigateByUrl('/forgotPassword');
  } */
  onSubmit() {
    if (this.loginForm.get('email')?.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Required',
        text: 'UserId is required.',
      });
    } else if (this.loginForm.get('password')?.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Required',
        text: 'Password is required.',
      });
    }

    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe(
        (res: any) => {
         let token = res.userData.token;
         // console.log(token);
         localStorage.setItem('token', res.userData.token);
         localStorage.setItem('username', res.userData.username);
         localStorage.setItem('roleId', res.userData.roleId);
         localStorage.setItem('roleName',res.userData.roleName);
           Swal.fire({
            icon: 'success',
            title: 'Login successful',
           }).then(() => {
            this.authService.isLoggedIn();
            this.router.navigate(['/Dashboard']);
          /* if (res.userData.roleId === 1) {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/Dashboard']);
          }*/
          }); 
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: 'Invalid credentials.',
          });
        }
      );
    }
  }


}
