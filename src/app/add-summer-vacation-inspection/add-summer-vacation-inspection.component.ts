import { Component, ElementRef, ViewChild,Renderer2 } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { InspectionServicesService } from '../services/inspection-services.service';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-summer-vacation-inspection',
  templateUrl: './add-summer-vacation-inspection.component.html',
  styleUrls: ['./add-summer-vacation-inspection.component.css']
})
export class AddSummerVacationInspectionComponent {
  @ViewChild('districtInput')districtInput!: ElementRef;
  @ViewChild('blockInput')
  blockInput!: ElementRef;
  @ViewChild('inspectionDateField')
  inspectionDateField!: ElementRef;

  @ViewChild('inspectionDateInput') inspectionDateInput!: ElementRef;

  SummerVacationConfigration : boolean = false;
  isYesChecked: boolean = true; 
  drindkingwater: string = ''; 
  isDrinkingWaterAvailable: any;
  isHouseKeepingFacility:any;
   isToiletCleanup:any;
  isToiletAvailable:any;
  isWatchManAvailable:any;
  watchManAvailable:string='';
  calculatedPercentage:any;
  identifiedstudentIII:any;
  identifiedstudentIV:any;
  waterFacility:any;
  block:any;
  blockCode:any;
  waterFacilityReason:any;
  houseKeepingFacility:any;
  houseKeepingFacilityReason:any;
  
  formData: any = {
    district: '' ,
    block:'',
    inspectionDate: '',
    schoolId:'',
    inspectionTime:'',
    teacherPosted:'',
    teacherPresent:'',
    unreportedLeave:'',
    mdmConducted:'',
    missionDakshClass4PercenatgePresent:'',
    missionDakshClass5IdentifiedChildren:'',
    inspectorName:'',

};
  myForm: any;
  drinkingWaterReason: any;
  showReasonField: any;
  //resultListData: any;
  isLoading = false;
  isNorecordFound: boolean = false;
  dataAvailable: boolean = false;
  blockData: any[] = [];
  districtId: any;
  blockId: any;
  schoolData: any[]=[];
  resultListData: any[] = [];
  startDate: any;
  endDate: any;
  selectedDate: any;
  formattedStartDate: any;
  formattedEndDate: any;
  errorMessage: string='';
  isSummerVacationActive: boolean = true; 
  dateField: any;
  componentDeactivated: boolean = false;
  date: any;
  maxDate: any;
 
 
    constructor(
      public InspectionServicesService: InspectionServicesService,
      private router:Router,
      private el: ElementRef,
      private spinner: NgxSpinnerService,
      private activatedRoute: ActivatedRoute,
      private renderer: Renderer2,
      private datePipe: DatePipe
    ) {this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is the "SummerVacation" route and update the flag accordingly
        this.isSummerVacationActive = this.isCurrentComponentSummerVacationInspectionComponent();
      }
    });
    
   } 
    
    
    ngOnInit(): void {
     // this.spinner.show();
      this.getDistrict();
      this.getActiveConfigurationData();
       
      

      const percentage = ((this.formData.annualExamClass5PresentStudent / this.formData.annualExamClass5AbsentStudent) * 100 || 0).toFixed(2);
                          this.formData.annualExamClass5PercentageStudent = percentage;

      const MissionDaksh3percentage = ((this.formData.missionDakshClass3PresentChildren / this.formData.missionDakshClass3IdentifiedChildren) * 100 || 0).toFixed(2);
                          this.formData.missionDakshClass3PercenatgePresent = percentage;   
                          
      const MissionDaksh4percentage = ((this.formData.missionDakshClass4PresentChildren / this.formData.missionDakshClass4IdentifiedChildren) * 100 || 0).toFixed(2);
              this.formData.missionDakshClass4PercenatgePresent = percentage; 
                          
      const MissionDaksh5percentage = ((this.formData.missionDakshClass5PresentChildren / this.formData.missionDakshClass5IdentifiedChildren) * 100 || 0).toFixed(2);
                          this.formData.missionDakshClass5PercenatgePresent = percentage; 

      const MissionDaksh6percentage = ((this.formData.missionDakshClass6PresentChildren / this.formData.missionDakshClass6IdentifiedChildren) * 100 || 0).toFixed(2);
                          this.formData.missionDakshClass6PercenatgePresent = percentage; 

      const MissionDaksh7percentage = ((this.formData.missionDakshClass7PresentChildren / this.formData.missionDakshClass7IdentifiedChildren) * 100 || 0).toFixed(2);
                          this.formData.missionDakshClass7PercenatgePresent = percentage; 

       const MissionDaksh8percentage = ((this.formData.missionDakshClass8PresentChildren / this.formData.missionDakshClass8IdentifiedChildren) * 100 || 0).toFixed(2);
                      this.formData.missionDakshClass8PercenatgePresent = percentage; 
      
                      
                                        
    }

     getDistrict(post ?: any): void {
     // this.spinner.show();
      this.InspectionServicesService.getDistrict(post).subscribe({
        next: (res: any) => {
        //  console.log(res);
          this.resultListData = res.data; 
        //  console.log(this.resultListData);
          this.isNorecordFound = this.resultListData.length === 0; 
          //  this.spinner.hide();
        },
        error: (error: any) => {
          console.error('Error fetching districts:', error);
         //  this.spinner.hide();
        }
      });
    }
    

    onDistrictChange(): void {
      const selectedDistrict = this.formData.district;
      if (selectedDistrict) { // Only fetch block data if a district is selected
        this.getBlock({ districtId: selectedDistrict });
      } else {
        // Clear blockData if no district is selected
        this.blockData = [];
      }
    }

    getBlock(districtId : any): void {
      this.isLoading = true;
      this.districtId = districtId;
      console.log(this.districtId);
      this.InspectionServicesService.getBlock(districtId).subscribe({
        next: (res: any) => {
        //  console.log('before',res);
          this.blockData = res.data; 
         // console.log('filter blockData',this.blockData);
          this.isNorecordFound = this.resultListData.length === 0; 
          this.isLoading = false;
        
        },
        error: (error: any) => {
          console.error('Error fetching block:', error);
          this.isLoading = false;
        
        }
      });
    }

    onBlockChange(): void {
      const selectedBlock = this.formData.block;
      if (selectedBlock) { 
        this.getSchoolList({ blockId: selectedBlock });
      } else {
       this.schoolData = [];
      }
    }

    getSchoolList(blockId : any): void {
      this.isLoading = true;
      this.blockId = blockId;
      console.log(this.blockId);
      this.InspectionServicesService.getSchoolList(blockId).subscribe({
        next: (res: any) => {
          console.log('before',res);
          this.schoolData = res.data; 
          console.log('afterfilter',this.schoolData);
          this.isNorecordFound = this.resultListData.length === 0; 
          this.isLoading = false;
        //  this.spinner.hide();
        },
        error: (error: any) => {
          console.error('Error fetching block:', error);
          this.isLoading = false;
         // this.spinner.hide();
        }
      });
    }

    
  changeReason() {
    this.showReasonField = this.formData.waterFacility === '2';
}

 NumericValue(event:any) {
  const key = event.keyCode;
  return (key >= 48 && key <= 57) || key === 8 || key === 46;
}


 
calculateTotal() {
  // Parse input values to numbers
  const failedStudentv = parseInt(this.formData.annualExamClass5AbsentStudent ?? '0');
  const presentStudentv = parseInt(this.formData.annualExamClass5PresentStudent ?? '0');
  const failedStudentVIII = parseInt(this.formData.annualExamClass8AbsentStudent ?? '0');
  const presentStudentVIII = parseInt(this.formData.annualExamClass8PresentStudent ?? '0');

  // Calculate total values
  this.formData.totalFailedStudent = failedStudentv + failedStudentVIII;
  this.formData.totalPresentStudent = presentStudentv + presentStudentVIII;

  // Calculate total percentage
  if (this.formData.totalFailedStudent > 0) {
    this.formData.totalPercentStudent = ((this.formData.totalPresentStudent / this.formData.totalFailedStudent) * 100).toFixed(2);
  } else {
    // If totalFailedStudent is zero, set totalPercentStudent to 0
    this.formData.totalPercentStudent = '0';
  }
}


 calculatePercentage() {
  let failedStudentv = parseInt(this.formData.annualExamClass5AbsentStudent ?? '0');
  let presentStudentv = parseInt(this.formData.annualExamClass5PresentStudent ?? '0');
  let failedStudentVIII = parseInt(this.formData.annualExamClass8AbsentStudent ?? '0');
  let presentStudentVIII = parseInt(this.formData.annualExamClass8PresentStudent ?? '0');

  if (failedStudentv > 0) {
    return (presentStudentv / failedStudentv) * 100;
  } else if (failedStudentVIII > 0) {
    return (presentStudentVIII / failedStudentVIII) * 100;
  } else {
    return 0;
  }

} 


validatetotalStudent() {
  const totalFailedClass5Student = parseInt(this.formData.annualExamClass5AbsentStudent ?? '0');
  const totalPresentClass5Student = parseInt(this.formData.annualExamClass5PresentStudent ?? '0');

  const totalIdentifiedStudentIV = parseInt(this.formData.missionDakshClass4IdentifiedChildren ?? '0');
  const markedStudentIV = parseInt(this.formData.missionDakshClass4PresentChildren ?? '0');

  const totalIdentifiedStudentV = parseInt(this.formData.missionDakshClass5IdentifiedChildren ?? '0');
  const markedStudentV = parseInt(this.formData.missionDakshClass5PresentChildren ?? '0');

  const totalIdentifiedStudentVI = parseInt(this.formData.missionDakshClass6IdentifiedChildren ?? '0');
  const markedStudentVI = parseInt(this.formData.missionDakshClass6PresentChildren ?? '0');

  const totalIdentifiedStudentVII = parseInt(this.formData.missionDakshClass7IdentifiedChildren ?? '0');
  const markedStudentVII = parseInt(this.formData.missionDakshClass7PresentChildren  ?? '0');

  const totalIdentifiedStudentVIII = parseInt(this.formData.missionDakshClass8IdentifiedChildren ?? '0');
  const markedStudentVIII = parseInt(this.formData.missionDakshClass8PresentChildren ?? '0');


      

  if (totalPresentClass5Student > totalFailedClass5Student) {
    Swal.fire({
      icon: 'error',
      text: 'The total number of students appeared should not exceed the total number of students who failed in class V and did not appear in the examination..',
    });
    this.formData.annualExamClass5PresentStudent = '';
    return;
  }

  // Check if the marked student exceeds the total identified students for set IV
  if (markedStudentIV > totalIdentifiedStudentIV) {
    Swal.fire({
      icon: 'error',
      text: 'Marked Student for Set IV should not exceed Total Identified Student for Set IV.',
    });
    this.formData.missionDakshClass4PresentChildren = '';
    return;
  }

  if (markedStudentV > totalIdentifiedStudentV) {
    Swal.fire({
      icon: 'error',
      text: 'Marked Student for Set V should not exceed Total Identified Student for Set V.',
    });
    this.formData.missionDakshClass5PresentChildren = '';
    return;
  }

 
  if (markedStudentVI > totalIdentifiedStudentVI) {
    Swal.fire({
      icon: 'error',
      text: 'Marked Student for Set VI should not exceed Total Identified Student for Set VI.',
    });
    this.formData.missionDakshClass6PresentChildren = '';
    return;
  }

  if (markedStudentVII > totalIdentifiedStudentVII) {
    Swal.fire({
      icon: 'error',
      text: 'Marked Student for Set VII should not exceed Total Identified Student for Set VII.',
    });
    this.formData.missionDakshClass7PresentChildren = '';
    return;
  }

  if (markedStudentVIII > totalIdentifiedStudentVIII) {
    Swal.fire({
      icon: 'error',
      text: 'Marked Student for Set VIII should not exceed Total Identified Student for Set VIII.',
    });
    this.formData.missionDakshClass8PresentChildren = '';
    return;
  }


}

   
  validatetotalmisssionDaksh() {
    const totalIdentifiedStudentIII = parseInt(this.formData.missionDakshClass3IdentifiedChildren ?? '0');
    const markedStudentIII = parseInt(this.formData.missionDakshClass3PresentChildren ?? '0');
  
    const totalIdentifiedStudentIV = parseInt(this.formData.missionDakshClass4IdentifiedChildren ?? '0');
    const markedStudentIV = parseInt(this.formData.missionDakshClass4PresentChildren ?? '0');

    const totalIdentifiedStudentV = parseInt(this.formData.missionDakshClass5IdentifiedChildren ?? '0');
    const markedStudentV = parseInt(this.formData.missionDakshClass5PresentChildren ?? '0');

    const totalIdentifiedStudentVI = parseInt(this.formData.missionDakshClass6IdentifiedChildren ?? '0');
    const markedStudentVI = parseInt(this.formData.missionDakshClass6PresentChildren ?? '0');

    const totalIdentifiedStudentVII = parseInt(this.formData.missionDakshClass7IdentifiedChildren ?? '0');
    const markedStudentVII = parseInt(this.formData.missionDakshClass7PresentChildren  ?? '0');

    const totalIdentifiedStudentVIII = parseInt(this.formData.missionDakshClass8IdentifiedChildren ?? '0');
    const markedStudentVIII = parseInt(this.formData.missionDakshClass8PresentChildren ?? '0');


        
    // Check if the marked student exceeds the total identified students for set III
    if (markedStudentIII > totalIdentifiedStudentIII) {
      Swal.fire({
        icon: 'error',
        text: 'Marked Student for Set III should not exceed Total Identified Student for Set III.',
      });
      this.formData.missionDakshClass3PresentChildren = '';
      return;
    }
  
    // Check if the marked student exceeds the total identified students for set IV
    if (markedStudentIV > totalIdentifiedStudentIV) {
      Swal.fire({
        icon: 'error',
        text: 'Marked Student for Set IV should not exceed Total Identified Student for Set IV.',
      });
      this.formData.missionDakshClass4PresentChildren = '';
      return;
    }

    if (markedStudentV > totalIdentifiedStudentV) {
      Swal.fire({
        icon: 'error',
        text: 'Marked Student for Set V should not exceed Total Identified Student for Set V.',
      });
      this.formData.missionDakshClass5PresentChildren = '';
      return;
    }

   
    if (markedStudentVI > totalIdentifiedStudentVI) {
      Swal.fire({
        icon: 'error',
        text: 'Marked Student for Set VI should not exceed Total Identified Student for Set VI.',
      });
      this.formData.missionDakshClass6PresentChildren = '';
      return;
    }

    if (markedStudentVII > totalIdentifiedStudentVII) {
      Swal.fire({
        icon: 'error',
        text: 'Marked Student for Set VII should not exceed Total Identified Student for Set VII.',
      });
      this.formData.missionDakshClass7PresentChildren = '';
      return;
    }

    if (markedStudentVIII > totalIdentifiedStudentVIII) {
      Swal.fire({
        icon: 'error',
        text: 'Marked Student for Set VIII should not exceed Total Identified Student for Set VIII.',
      });
      this.formData.missionDakshClass8PresentChildren = '';
      return;
    }


  }

  calculateTotalMissionDaksh() {
    // Parse input values to numbers
    const identifiedStudentIII = parseInt(this.formData.missionDakshClass3IdentifiedChildren ?? '0');
    const identifiedStudentIV = parseInt(this.formData.missionDakshClass4IdentifiedChildren ?? '0');
    const identifiedStudentV = parseInt(this.formData.missionDakshClass5IdentifiedChildren ?? '0');
    const identifiedStudentVI = parseInt(this.formData.missionDakshClass6IdentifiedChildren ?? '0');
    const identifiedStudentVII = parseInt(this.formData.missionDakshClass7IdentifiedChildren ?? '0');
    const identifiedStudentVIII = parseInt(this.formData.missionDakshClass8IdentifiedChildren ?? '0');
  
    const markedStudentIII = parseInt(this.formData.missionDakshClass3PresentChildren ?? '0');
    const markedStudentIV = parseInt(this.formData.missionDakshClass4PresentChildren ?? '0');
    const markedStudentV = parseInt(this.formData.missionDakshClass5PresentChildren ?? '0');
    const markedStudentVI = parseInt(this.formData.missionDakshClass6PresentChildren ?? '0');
    const markedStudentVII = parseInt(this.formData.missionDakshClass7PresentChildren ?? '0');
    const markedStudentVIII = parseInt(this.formData.missionDakshClass8PresentChildren ?? '0');
  
    // Calculate total values
    this.formData.totalidntifiedStudent = identifiedStudentIII + identifiedStudentIV + identifiedStudentV + identifiedStudentVI + identifiedStudentVII + identifiedStudentVIII;
    this.formData.totalmarkedStudent = markedStudentIII + markedStudentIV + markedStudentV + markedStudentVI + markedStudentVII + markedStudentVIII;
  
    // Calculate total percentage
    if (this.formData.totalidntifiedStudent > 0) {
      this.formData.totalpercentStudent = ((this.formData.totalmarkedStudent / this.formData.totalidntifiedStudent) * 100).toFixed(2);
    } else {
      this.formData.totalpercentStudent = '0';
    }
  }
  
 
  calculateTotalStudent() {
  // Parse input values to numbers
  const failedStudentIX = parseInt(this.formData.failedStudentIX ?? '0');
  const PresentStudentIX = parseInt(this.formData.PresentStudentIX ?? '0');
  const failedStudentXI = parseInt(this.formData.failedStudentXI ?? '0');
  const PresentStudentXI = parseInt(this.formData.PresentStudentXI ?? '0');

  // Calculate total values
  this.formData.totalfailedStudents = failedStudentIX + failedStudentXI;
  this.formData.totalPresentStudents = PresentStudentIX + PresentStudentXI;

  // Calculate total percentage
  if (this.formData.totalfailedStudents > 0) {
    this.formData.totalPercentStudents = parseFloat(((this.formData.totalPresentStudents / this.formData.totalfailedStudents) * 100).toFixed(2));
  } else {
    // If totalFailedStudent is zero, set totalPercentStudent to 0
    this.formData.totalPercentStudents = 0;
  }
} 
  

/*
getActiveConfigrationData() {
 // this.spinner.show(); // Show spinner
  this.InspectionServicesService.getConfigrationData().subscribe({
    next: (res: any) => {
      const filteredItems = res.data.filter((item: any) => item.moduleName === 'Summer Vacation Inspection');
      if (filteredItems.length > 0) {
        const status1Items = filteredItems.filter((item: any) => item.isStatus === 1);
        if (status1Items.length > 0) {
          const startDateParts = status1Items[0].startDate.split('-').map(Number);
          const endDateParts = status1Items[0].endDate.split('-').map(Number);
          this.startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);
          this.endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);

          this.formattedStartDate = this.startDate.toISOString().split('T')[0];
          this.formattedEndDate = this.endDate.toISOString().split('T')[0];

         // this.formattedStartDate = `${this.startDate.getFullYear()}-${(this.startDate.getMonth() + 1).toString().padStart(2, '0')}-${this.startDate.getDate().toString().padStart(2, '0')}`;
          //this.formattedEndDate = `${this.endDate.getFullYear()}-${(this.endDate.getMonth() + 1).toString().padStart(2, '0')}-${this.endDate.getDate().toString().padStart(2, '0')}`;
         // console.log(this.formattedStartDate);
        } else {
          const status2Items = filteredItems.filter((item: any) => item.isStatus === 2);
          if (status2Items.length > 0 && this.isCurrentComponentSummerVacationInspectionComponent()) {
            // Disable the route by removing the routerLink
             const routeLink = document.querySelector('a[routerLink="/SummerVacation"]');
            if (routeLink) {
              routeLink.removeAttribute('routerLink');
        } 
            document.addEventListener('click', this.openPopupOnClick);
          } 
        }
      }
      this.isLoading = false;
     // this.spinner.hide(); // Hide spinner
    },
    error: (error) => {
      console.error('Error:', error);
      this.errorMessage = "Please try again later.";
      this.isLoading = false;
     // this.spinner.hide(); // Hide spinner in case of error
    }
  });
}
*/

/*
getActiveConfigrationData() {
  this.InspectionServicesService.getConfigrationData().subscribe({
    next: (res: any) => {
      const filteredItems = res.data.filter((item: any) => item.moduleName === 'Summer Vacation Inspection');
      if (filteredItems.length > 0) {
        const status1Items = filteredItems.filter((item: any) => item.isStatus === 1);
        if (status1Items.length > 0) {
          const startDateParts = status1Items[0].startDate.split('-').map(Number);
          const endDateParts = status1Items[0].endDate.split('-').map(Number);
          this.startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);
          this.endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);

          this.formattedStartDate = this.startDate.toISOString().split('T')[0];
          this.formattedEndDate = this.endDate.toISOString().split('T')[0];
          this.dataAvailable = true; // Data is available
        } else {
          const status2Items = filteredItems.filter((item: any) => item.isStatus === 2);
          if (status2Items.length > 0 && this.isCurrentComponentSummerVacationInspectionComponent()) {
            // Show alert
            alert("Configration Data is not available.");
            this.dataAvailable = false; // Data is not available
          }
        }
      } else {
        // Show alert
        alert("Configration Data is not available.");
        this.dataAvailable = false; // Data is not available
      }
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error:', error);
      this.errorMessage = "Please try again later.";
      this.isLoading = false;
    }
  });
}

*/

/* getActiveConfigrationData() {
  this.InspectionServicesService.getSummerVacationConfigrationData().subscribe({
    next: (res: any) => {
      const filteredItems = res.data.filter((item: any) => item.moduleName === 'Summer Vacation Inspection');
      if (filteredItems.length > 0) {
        const status1Items = filteredItems.filter((item: any) => item.isStatus === 1);
        if (status1Items.length > 0) {
          const startDateParts = status1Items[0].startDate.split('-').map(Number);
          const endDateParts = status1Items[0].endDate.split('-').map(Number);
          this.startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);
          this.endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);

         // this.formattedStartDate = this.startDate.toISOString().split('T')[0];
         // this.formattedEndDate = this.endDate.toISOString().split('T')[0];

          //this.selectedDate = this.formattedStartDate;
          this.formattedStartDate = this.formatDate(this.startDate);
          this.formattedEndDate = this.formatDate(this.endDate); 


          this.dataAvailable = true; // Data is available
        } else {
          const status2Items = filteredItems.filter((item: any) => item.isStatus === 2);
          if (status2Items.length > 0 && this.isCurrentComponentSummerVacationInspectionComponent()) {
            const reason = status2Items[0].reason;
            // Get the current URL
            const currentUrl = this.router.url;

            // Check current URL  /Add/SummerVacationInspection
            if (currentUrl === '/Add/SummerVacationInspection') {
              // Show alert
              Swal.fire({
                icon: 'warning',
                title: 'School is currently deactivated',
                text: `Reason: ${reason}`,
                confirmButtonText: 'OK'
              });
             
            }
          }
        }
      } else {
     
        Swal.fire({
          icon: 'warning',
          title: 'Configuration Data Alert',
          text: 'Configuration Data is not available.',
          confirmButtonText: 'OK'
        });
        this.dataAvailable = false; // Data is not available
      }
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error:', error);
      this.errorMessage = "Please try again later.";
      this.isLoading = false;
    }
  });
}
 */



getActiveConfigurationData() {
  this.spinner.show();
  this.InspectionServicesService.getSummerVacationConfigrationData().subscribe({
    next: (res: any) => {
    //  console.log('result', res);
      const filteredItems = res.data.filter((item: any) => item.moduleName === 'Summer Vacation Inspection');
      if (filteredItems.length > 0) {
        const status1Items = filteredItems.filter((item: any) => item.isStatus === 1);
        if (status1Items.length > 0) {
          const startDateString = status1Items[0].startDate;
          const endDateString = status1Items[0].endDate;

          // Parse start date string
          const startDateParts = startDateString.split('-').map(Number);
          this.startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);

          // Parse end date string
          const endDateParts = endDateString.split('-').map(Number);
          this.endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);

          this.formattedStartDate = this.formatDate(this.startDate);
         // console.log('formattedStartDate', this.formattedStartDate);
          this.formattedEndDate = this.formatDate(this.endDate); 

          // Set default inspection date
        //  this.formData.inspectionDate = '';

          // Disable future dates
          const currentDate = new Date();
          this.maxDate = this.formatDate(currentDate);
          
          this.dataAvailable = true; // Data is available
        } else {
          const status2Items = filteredItems.filter((item: any) => item.isStatus === 2);
          if (status2Items.length > 0 && this.isCurrentComponentSummerVacationInspectionComponent()) {
            const reason = status2Items[0].reason;
            const currentUrl = this.router.url;
            if (currentUrl === '/Add/SummerVacationInspection') {
              Swal.fire({
                icon: 'warning',
                title: 'Summer Vacation Inspection currently deactivated',
                text: `${reason}`,
                confirmButtonText: 'OK'
              });
            }
          }
        }
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Configuration Data Alert',
          text: 'Configuration Data is not available,First Create configration',
          confirmButtonText: 'OK'
        });
        this.dataAvailable = false; // Data is not available
      }
      this.spinner.hide(); // Hide the spinner after API call completes
      
    },
    error: (error) => {
      this.spinner.hide(); // Hide the spinner on error as well
      this.errorMessage = "Please try again later.";
    
    }
  });
}

formatDate(date: Date): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}



/*

getActiveConfigrationData() {
  this.InspectionServicesService.getConfigrationData().subscribe({
    next: (res: any) => {
      const filteredItems = res.data.filter((item: any) => item.moduleName === 'Summer Vacation Inspection');
      let message = 'Configuration Data is not available. Please create configuration Data.';

      if (filteredItems.length > 0) {
        const status1Items = filteredItems.filter((item: any) => item.isStatus === 1);
        if (status1Items.length > 0) {
          const startDateParts = status1Items[0].startDate.split('-').map(Number);
          const endDateParts = status1Items[0].endDate.split('-').map(Number);
          this.startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);
          this.endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);

          this.formattedStartDate = this.startDate.toISOString().split('T')[0];
          this.formattedEndDate = this.endDate.toISOString().split('T')[0];
          this.dataAvailable = true; // Data is available
          message = ''; // No need to show any message if data is available
        } else {
          const status2Items = filteredItems.filter((item: any) => item.isStatus === 2);
          if (status2Items.length > 0 && this.isCurrentComponentSummerVacationInspectionComponent()) {
            message = 'Configuration Data is not available. Please create configuration Data.';
          }
        }
      }

      // Show SweetAlert dialog only if there is a message to show
      if (message !== '') {
        Swal.fire({
          icon: 'info',
          title: 'Configuration Data Alert',
          text: message,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.dataAvailable = !!(filteredItems.length > 0); // Update data availability
          }
        });
      } else {
        this.dataAvailable = true; // Data is available, no need to show any message
      }

      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error:', error);
      this.errorMessage = "Please try again later.";
      this.isLoading = false;
    }
  });
}
*/



showPopupBox(message: string) {
  // Code to show the popup box with the given message
}


isCurrentComponentSummerVacationInspectionComponent(): boolean {

 // const currentRoute = this.activatedRoute.snapshot.routeConfig?.path;
  
  //return currentRoute === 'SummerVacation';
  
   return true; 
} 




    onSubmit() {

      if (this.formData.district === '') {
        Swal.fire({
          icon: 'error',
          text: 'District is Required.'
        }).then(() => {
          if (this.districtInput && this.districtInput.nativeElement) {
            this.districtInput.nativeElement.focus();
          }
        });
        return; 
      }
           if (this.formData.block === '') {
                  Swal.fire({
                    icon: 'error',
                  text: 'Block is Required.',
                });
                return; 
            }

              if (this.formData.inspectionDate =='') {
                Swal.fire({
                  icon: 'error',
                text: 'InspectionDates is Required.',
              });
              return; 
          }

          if (this.formData.schoolId === '') {
            Swal.fire({
              icon: 'error',
            text: 'School is Required.',
          });
          return; 
      }

         if(this.formData.inspectionTime===''){
          Swal.fire({
            icon:'error',
            text:'InspectionTime is Required'
          })

         }

         if(this.formData.teacherleave ===''){
          Swal.fire({
            icon:'error',
            text:'No.Of Teacher Leave is Required'
          })

         }

         if(this.formData.teacherPresent===''){
          Swal.fire({
            icon:'error',
            text:'No.Of Teacher Present is Required'
          })

         }

         if(this.formData.teacherPosted===''){
          Swal.fire({
            icon:'error',
            text:'No. Of Teacher Posted is Required'
          })

         }

        /*  if(this.formData.mdmConducted===''){
          Swal.fire({
            icon:'error',
            text:'MidDayMeal is Required'
          })

         }

         if (!this.waterFacility) {
          Swal.fire({
              icon: 'error',
              text: 'Please select whether there is drinking water facility in the school or not.',
          });
          return;
      }
      if (this.waterFacility === 'no' && !this.waterFacilityReason) {
          Swal.fire({
              icon: 'error',
              text: 'Please provide a reason if there is no drinking water facility in the school.',
          });
          return;
      } */

      /* Swal.fire({
        title: 'Are you sure?',
        text: 'You want to submit the form?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit it!',
        cancelButtonText: 'No, cancel!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.InspectionserviceService.addsummerVacation(this.formData)
            .subscribe({
              next: (res: any) => {
                console.log('api:', res);
                let msg = res.msg;
                console.log(msg);
                Swal.fire('Submitted!', msg, 'success').then(() => {
                  this.router.navigate(['/ViewInspectionConfigration']);
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
       */


      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to submit the form?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit it!',
        cancelButtonText: 'No, cancel!'
      }).then((result) => {
        if (result.isConfirmed) {
          const selectedDate = new Date(this.formData.inspectionDate);

          this.formData.inspectionDate = this.datePipe.transform(this.formData.inspectionDate, 'yyyy-MM-dd');
                  
          if (selectedDate >= this.startDate && selectedDate <= this.endDate) {
           
            this.InspectionServicesService.addsummerVacation(this.formData).subscribe({
              next: (res: any) => {
                console.log('api:', res);
                let msg = res.msg;
                Swal.fire('Submitted!', msg, 'success').then(() => {
                  this.router.navigate(['/ViewSummerVacation']);
                });
              },
              error: (error: any) => {
                console.log('api:', error.error.msg);
                Swal.fire('Error', error.error.msg, 'error');
              }
            });
          } else {
           
            Swal.fire({
              icon: 'error',
              text: 'Selected date must be within the specified range.'
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your form submission was cancelled :)',
            'error'
          );
        }
      });
      
     
    }
    showSpinner() {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 3000); // Hide spinner after 3 seconds
    }

  }
