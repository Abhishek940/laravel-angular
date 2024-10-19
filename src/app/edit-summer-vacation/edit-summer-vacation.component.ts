import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { InspectionServicesService } from '../services/inspection-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-summer-vacation',
  templateUrl: './edit-summer-vacation.component.html',
  styleUrls: ['./edit-summer-vacation.component.css']
})
export class EditSummerVacationComponent {

  isYesChecked: boolean = true; 
  drindkingwater: string = ''; 
  isDrinkingWaterAvailable: any;
  //isHouseKeepingFacility:any;
  houseKeepingFacility:string='';
  isToiletCleanup:any;
  isToiletAvailable:any;
  isNightWatchmanAvail:any;
  watchManAvailable:string='';
  calculatedPercentage:any;
  identifiedstudentIII:any;
  identifiedstudentIV:any;
  waterFacility:any;
  block:any;
  blockCode:any;
  showReasonField:any;
  waterFacilityReason:any;
  selectedDate: any;
  formattedStartDate: any;
  formattedEndDate: any;
  formData: any = {
   districtId: '',
    blockId: '',
    schoolId: '',
    teacherPosted: 0,
    teacherPresent:'',
    unreportedLeave:'',
    inspectionDate: '',
    inspectionTime: '',
    inspectorName: '',
    designation: '',
    mobile:'',
    annualExamClass5PercentageStudent:'',
    annualExamClass5PresentStudent:'',
    annualExamClass5AbsentStudent:'',
    waterFacility:'',
    houseKeepingFacility:'',
    isIctLabHeld:'',

  };
  resultListData: any;
  isNorecordFound: boolean = false;
  isLoading = false;
isMobileValid:any;
  blockData: any[] = [];
  districtId: any;
  blockId: any;
  schoolData: any[] = [];

  constructor(
    public InspectionServicesService: InspectionServicesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getDistrict();
    const idParam = this.route.snapshot.paramMap.get('id');
    this.formData['inspectionId'] = idParam;
    console.log(this.formData);
    if (idParam) {
      const id = +idParam;
      if (!isNaN(id)) {
        this.editSummerVacationData(id);
      } else {
        console.error('id:', idParam);
      }
    } 

    this.route.params.subscribe(params => {
      const id = params['id']; 
      this.editSummerVacationData(id);
      
  });
  }

  changeReason() {
    this.showReasonField = this.waterFacility === '2';
}
  getDistrict(post ?: any): void {
    this.isLoading = true;
    this.InspectionServicesService.getDistrict(post).subscribe({
        next: (res: any) => {
            this.resultListData = res.data;
            this.isNorecordFound = this.resultListData.length === 0;
            this.isLoading = false;
            // Pre-select the district if it's already set in formData
            if (this.formData.district && this.resultListData.length > 0) {
                const selectedDistrict = this.resultListData.find((district: any) => district.districtId === this.formData.district);
                if (selectedDistrict) {
                    this.formData.district = selectedDistrict.districtId;
                    // Trigger change detection manually
                    this.onDistrictChange();
                }
            }
        },
        error: (error: any) => {
            console.error('Error fetching districts:', error);
            this.isLoading = false;
        }
    });
}

onDistrictChange(): void {
    const selectedDistrict = this.formData.district;
    if (selectedDistrict) {
        this.getBlock(selectedDistrict);
    } else {
        this.blockData = []; 
        this.schoolData = []; 
    }
}

getBlock(districtId: any): void {
  this.isLoading = true;
  this.districtId = districtId;
  this.InspectionServicesService.getBlock(districtId).subscribe({
    next: (res: any) => {
      this.blockData = res.data;
      this.isNorecordFound = this.blockData.length === 0;
      this.isLoading = false;
      // Pre-select the block if it's already set in formData
      if (this.formData.block && this.blockData.length > 0) { // Check existence before pre-selecting
        const selectedBlock = this.blockData.find((block: any) => block.blockId === this.formData.block);
        if (selectedBlock) {
          this.formData.block = selectedBlock.blockId;
          // Trigger change detection manually
          this.onBlockChange();
        }
      }
    },
    error: (error: any) => {
      console.error('Error fetching blocks:', error);
      this.isLoading = false;
    }
  });
}

onBlockChange(): void {
  const selectedBlock = this.formData.block;
  if (selectedBlock) {
    this.getSchoolList(selectedBlock);
  } else {
    this.schoolData = [];
  }
}

getSchoolList(blockId: any): void {
  this.isLoading = true;
  this.blockId = blockId;
  console.log(this.blockId);
  this.InspectionServicesService.getSchoolList(blockId).subscribe({
    next: (res: any) => {
      this.schoolData = res.data;
      this.isNorecordFound = this.schoolData.length === 0;
      this.isLoading = false;
      // Pre-select the school if it's already set in formData
      if (this.formData.school && this.schoolData.length > 0) { // Check existence before pre-selecting
        const selectedSchool = this.schoolData.find((school: any) => school.schoolId === this.formData.school);
        if (selectedSchool) {
          this.formData.school = selectedSchool.schoolId;
        }
      }
    },
  });
}

NumOnly(event: any) {
  const key = event.keyCode;
  return (key >= 48 && key <= 57) || key === 8 || key === 46; 
}

navigateToView() {
  this.router.navigate(['/SummerVacationList']);
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
  
selectedInspectionDate: any;

NumericValue(event:any) {
  const key = event.keyCode;
  return (key >= 48 && key <= 57) || key === 8 || key === 46;
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

  editSummerVacationData(id: number) {
     // console.log(id);
      this.InspectionServicesService.getSummerVacationDataById(id).subscribe({
          next: (res: any) => {
              console.log('Response:', res);
              const data = res.data;
                
              this.formData.district = data.districtId;
              this.getBlock(data.districtId);
              this.formData.block = data.blockId;
            //  this.formData.patchValue({ blockId: data.blockId });
             // console.log(this.formData.blockId);
              this.formData.schoolId = data.schoolId;
              this.formData.teacherPosted=data.teacherPosted;
              this.formData.teacherPresent=data.teacherPresent;
              this.formData.unreportedLeave=data.unreportedLeave;
              this.formData.annualExamClass5PercentageStudent=data.annualExamClass5PercentageStudent;
              this.formData.annualExamClass5PresentStudent=data.annualExamClass5PresentStudent;
              this.formData.annualExamClass5AbsentStudent=data.annualExamClass5AbsentStudent;

              this.formData.annualExamClass8PercentageStudent=data.annualExamClass8PercentageStudent;
              this.formData.annualExamClass8PresentStudent=data.annualExamClass8PresentStudent;
              this.formData.annualExamClass8AbsentStudent=data.annualExamClass8AbsentStudent;

              this.formData.missionDakshClass3IdentifiedChildren=data.missionDakshClass3IdentifiedChildren;
              this.formData.missionDakshClass3PresentChildren=data.missionDakshClass3PresentChildren;
              this.formData.missionDakshClass3PercenatgePresent=data.missionDakshClass3PercenatgePresent;

              this.formData.missionDakshClass4IdentifiedChildren=data.missionDakshClass4IdentifiedChildren;
              this.formData.missionDakshClass4PresentChildren=data.missionDakshClass4PresentChildren;
              this.formData.missionDakshClass4PercenatgePresent=data.missionDakshClass4PercenatgePresent;

              this.formData.missionDakshClass5IdentifiedChildren=data.missionDakshClass5IdentifiedChildren;
              this.formData.missionDakshClass5PresentChildren=data.missionDakshClass5PresentChildren;
              this.formData.missionDakshClass5PercenatgePresent=data.missionDakshClass5PercenatgePresent;

              this.formData.missionDakshClass6IdentifiedChildren=data.missionDakshClass6IdentifiedChildren;
              this.formData.missionDakshClass6PresentChildren=data.missionDakshClass6PresentChildren;
              this.formData.missionDakshClass6PercenatgePresent=data.missionDakshClass6PercenatgePresent;

              this.formData.missionDakshClass7IdentifiedChildren=data.missionDakshClass7IdentifiedChildren;
              this.formData.missionDakshClass7PresentChildren=data.missionDakshClass7PresentChildren;
              this.formData.missionDakshClass7PercenatgePresent=data.missionDakshClass7PercenatgePresent;

              this.formData.missionDakshClass8IdentifiedChildren=data.missionDakshClass8IdentifiedChildren;
              this.formData.missionDakshClass8PresentChildren=data.missionDakshClass8PresentChildren;
              this.formData.missionDakshClass8PercenatgePresent=data.missionDakshClass8PercenatgePresent;

              this.formData.mdmConducted=data.mdmConducted;
              this.formData.waterFacility=data.waterFacility;
              this.formData.waterFacilityReason=data.waterFacilityReason;
              this.formData.houseKeepingFacility=data.houseKeepingFacility;
              this.formData.houseKeepingFacilityReason=data.houseKeepingFacilityReason;
              this.formData.toiletFacilityStatus=data.toiletFacilityStatus;
              this.formData.isYesToiletFacilityStatus=data.isYesToiletFacilityStatus;
              this.formData.isYesToiletFacilityStatusReason=data.isYesToiletFacilityStatusReason;
              this.formData.isNightWatchmanAvail=data.isNightWatchmanAvail;
              this.formData.isNightWatchmanAvailReason=data.isNightWatchmanAvailReason;

              this.formData.isIctLabHeld=data.isIctLabHeld,
              this.formData.inspectionDate = data.inspectionDate;
              this.formData.inspectionTime = data.inspectionTime;
              this.formData.inspectorName = data.inspectorName;
              this.formData.designation = data.designation;
              this.formData.mobile = data.mobile;
              this.isNorecordFound = false;
              this.isLoading = false;
          },
          error: (error: any) => {
              console.error('Error:', error);
              this.isLoading = false;
          },
      });
  }
  
  validateMobile(event: KeyboardEvent): void {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    const inputChar = event.key;

    // Check if the entered key is allowed
    if (!allowedKeys.includes(inputChar)) {
        event.preventDefault(); // Prevent the default action (typing the character)
    }

    // Check if the mobile number starts with 1, 2, 3, 4, or 5
    if (this.formData.mobile && this.formData.mobile.length === 0 && ['1', '2', '3', '4', '5'].includes(inputChar)) {
        event.preventDefault(); // Prevent typing if the first character is 1, 2, 3, 4, or 5
    }
}


  onSubmit(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to submit the form?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        // const id = this.formData.id;
        
       
        this.InspectionServicesService.updateSummerVacationData(this.formData).subscribe({
          next: (res: any) => {
            console.log('data',res)
            let msg = res.msg;
            Swal.fire('Submitted!', msg, 'success').then(() => {
              this.resetForm();
              this.router.navigate(['/SummerVacationList']);
            });
          },
          error: (error: any) => {
           Swal.fire('Error', error.error.msg, 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your form submission was cancelled :)', 'error');
      }
    });
  }
 

  resetForm() {
    this.formData.schoolName = '';
    this.formData.inspectionDate = '';
    this.formData.inspectionTime = '';
   
  }
}

