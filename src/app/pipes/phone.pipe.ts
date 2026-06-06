import { Pipe, PipeTransform } from '@angular/core';
import { PhoneMode } from '../../enums/PhoneMode';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {

  transform(phone: string, mode: PhoneMode): string {
    const clearPhone: string = phone.includes('x') ? phone.slice(0, phone.lastIndexOf('x')).replace(/\D/g, "") : phone.replace(/\D/g, "");
    let countryCode: string = '1';
    let cityCode!: string;
    let number!: string;

    if (clearPhone.length == 10) {
      cityCode = clearPhone.slice(0, 3);
      number = clearPhone.slice(3);
    } else if (clearPhone.length == 11) {
      countryCode = clearPhone[0];
      cityCode = clearPhone.slice(1, 4);
      number = clearPhone.slice(4);
    } else if (clearPhone.length == 12) {
      countryCode = clearPhone.slice(0, 2);
      cityCode = clearPhone.slice(2, 5);
      number = clearPhone.slice(5);
    } else {
      return `+${ clearPhone }`;
    }

    switch (mode) {
      case 'compact':
        return `+${ clearPhone }`;
      case 'international':
        return `+${ countryCode } ${ cityCode } ${ number.slice(0, 3) } ${ number.slice(3, 5) } ${ number.slice(-2) }`
      case 'national':
        return `${ cityCode } ${ number.slice(0, 3) } ${ number.slice(3, 5) } ${ number.slice(-2) }`
      case 'masked':
        return `+${ countryCode } ${ cityCode } *** ** ${ number.slice(-2) }`
      default:
        return phone;
    }
  }

}
