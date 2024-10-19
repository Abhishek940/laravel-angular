import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDateFormat]'
})
export class DateFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: any) {
    const inputValue = event.target.value;
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(inputValue)) {
      // Only allow input in the format mm/dd/yyyy
      this.el.nativeElement.value = '';
    }
  }

}
