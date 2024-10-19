import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { AuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PiChartComponent } from "./user/pi-chart/pi-chart.component";
import { WebexComponentComponent } from './webex-component/webex-component.component';
import {WebexCallbackComponentComponent} from './webex-callback-component/webex-callback-component.component'
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component:LoginComponentComponent },
  { path:'forgotPassword', component:ForgotPasswordComponent},
  { path: 'resetPassword/:token', component: ResetPasswordComponent },
  { path:'admin-dashboard',component:AdminDashboardComponent,canActivate:[AuthGuard]},
  { path: 'Dashboard', component: DashboardComponentComponent ,canActivate: [AuthGuard] },
 // { path: 'feature', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule) },
 // { path: '', redirectTo: '/feature', pathMatch: 'full' },
 // { path: '**', redirectTo: '/feature' }
 
  
 { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
 // { path: '', redirectTo: '/user/dashboard', pathMatch: 'full' },
 // { path: '**', redirectTo: '/user/dashboard' }

 { path: 'Webex', component: WebexComponentComponent},
  {path :'webex/callback', component:WebexCallbackComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
