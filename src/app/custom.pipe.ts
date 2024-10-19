import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom',
 // standalone: true
})
export class CustomPipe implements PipeTransform {

  /*  transform(value: unknown, ...args: unknown[]): unknown {
    return value +'!!';  */

    transform(value: string): string {
      if (!value) return value;
      return value.replace(/\b\w/g, first => first.toLocaleUpperCase());

   
  }

}
