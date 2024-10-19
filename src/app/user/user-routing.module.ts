import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserListComponent } from './view-user-list/view-user-list.component';
import { DashboardComponentComponent } from '../dashboard-component/dashboard-component.component';
import { AuthGuard } from '../auth.guard';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {CategoryComponent} from './category/category.component';
import {ViewCategoryComponent}  from './view-category/view-category.component';
const routes: Routes = [
  { path: 'user', canActivate: [AuthGuard], 
  
    children: [
     { path:'AddCategory',component:CategoryComponent} ,
     { path:'viewCategory',component:ViewCategoryComponent},
     { path: 'AddUser', component: AddUserComponent  },
     { path: 'viewUser', component: ViewUserListComponent },
     { path: 'Dashboard', component: DashboardComponentComponent ,canActivate: [AuthGuard] },
     { path :'changePassword' ,component:ChangePasswordComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
