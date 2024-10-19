import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor'; 
import { NgxSpinnerModule } from "ngx-spinner";
import { LoginComponentComponent } from './login-component/login-component.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { ViewSummerVacationListComponent } from './view-summer-vacation-list/view-summer-vacation-list.component';
import { InspectionConfigrationComponent } from './inspection-configration/inspection-configration.component';
import { ViewInspectionConfigrationComponent } from './view-inspection-configration/view-inspection-configration.component';
import { AddSummerVacationInspectionComponent } from './add-summer-vacation-inspection/add-summer-vacation-inspection.component';
import { EditSummerVacationComponent } from './edit-summer-vacation/edit-summer-vacation.component';
import { EditInspectionConfigrationComponent } from './edit-inspection-configration/edit-inspection-configration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DateFormatDirective } from './date-format.directive';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SideBarMenuComponent } from './side-bar-menu/side-bar-menu.component';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { UserModule }  from "src/app/user/user.module";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { PiChartComponent } from "./user/pi-chart/pi-chart.component";
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { CustomPipe } from './custom.pipe';
import { WebexComponentComponent } from './webex-component/webex-component.component';
import { WebexCallbackComponentComponent } from './webex-callback-component/webex-callback-component.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponentComponent,
        DashboardComponentComponent,
        ViewSummerVacationListComponent,
        InspectionConfigrationComponent,
        ViewInspectionConfigrationComponent,
        AddSummerVacationInspectionComponent,
        EditSummerVacationComponent,
        EditInspectionConfigrationComponent,
        DateFormatDirective,
        SideBarMenuComponent,
        ImageUploadComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        AdminDashboardComponent,
         ParentComponent,
         ChildComponent,
         CustomPipe,
         WebexComponentComponent,
         WebexCallbackComponentComponent
         
         
         
    ],
    providers: [DatePipe, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        NgxMatTimepickerModule,
        ReactiveFormsModule,
        NgxMatDatetimePickerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
        NgxPaginationModule,
        UserModule,
        CKEditorModule,
        PiChartComponent
    ]
})
export class AppModule { }
