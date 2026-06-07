import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(number: number, singularWord: string, wordBetweenForms: string, pluralWord: string): string {
    const remainder = number % 10;
    const twoDigitNumbers: number[] = [11, 12, 13, 14, 15, 16, 17, 18, 19];
    
    if (number == 0 || remainder == 0 || remainder >= 5 || twoDigitNumbers.includes(number)) {
      return `${ number } ${ pluralWord}`;
    } else if (remainder == 1) {
      return `${ number } ${ singularWord }`;
    } else {
      return `${ number } ${ wordBetweenForms }`;
    }
  }

}
