import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category',
  //standalone: true,
  //imports: [],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
addCategory!: FormGroup;

constructor(
    private fb:FormBuilder,  public AuthService: AuthService, private router:Router,
){}

ngOnInit(): void {
  this.addCategory = this.fb.group({
    categoryName: ['', Validators.required],
   });
}

onReset(){
  this.addCategory.reset();
}

onSubmit(){
   if(this.addCategory.get('categoryName')?.invalid){
    Swal.fire({
      icon:'error',
      text:'Category is Required',
    });
    return;
   }

   Swal.fire({
    title: 'Are you sure?',
    text: 'You want to submit the form?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, submit it!',
    cancelButtonText: 'No, cancel!'
}).then((result) => {
    if (result.isConfirmed) {
        this.AuthService.addCategory(this.addCategory.value)
            .subscribe({
                next: (res: any) => {
                    let msg = res.msg;
                    Swal.fire('Submitted!', msg, 'success').then(() => {
                        this.addCategory.reset();
                        this.router.navigate(['/user/viewCategory']);
                    });
                },
                error: (error: any) => {
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

   

}

}
