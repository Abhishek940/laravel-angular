import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ViewUserListComponent } from './view-user-list/view-user-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PiChartComponent } from "./pi-chart/pi-chart.component";
import { ChangePasswordComponent } from "./change-password/change-password.component"
import { AngularEditorModule } from '@kolkov/angular-editor';
import {CategoryComponent} from './category/category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
@NgModule({
    declarations: [
        UserProfileComponent,
        AddUserComponent,
        ViewUserListComponent,
        DashboardComponent,
        NavbarComponent,
        // AdminDashboardComponent,
        ChangePasswordComponent,
        CategoryComponent,
        ViewCategoryComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgxSpinnerModule,
        PiChartComponent,
        AngularEditorModule
    ]
})
export class UserModule { }
