import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-jwt';
  currentDate = new Date();
  amount = 1234.56;
  isLoginPage:boolean = false;
  showForgotPassword: boolean = false;

 constructor(private router: Router,private authService: AuthService) {}

   ngOnInit() { 
    /* if (this.authService.isLoggedIn()) {
      this.router.navigate(['/Dashboard']);
    } */
   }

isLoggedIn(): boolean {
  return this.authService.isLoggedIn();
}



}