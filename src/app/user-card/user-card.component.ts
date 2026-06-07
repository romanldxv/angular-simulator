import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhonePipe } from '../pipes/phone.pipe';
import { PhoneMode } from '../../enums/PhoneMode';
import { HoverBoldDirective } from '../directives/hover-bold.directive';
import { HoverGradientBorderDirective } from '../directives/hover-gradient-border.directive';
import { IGradientConfiguration } from '../../interfaces/IGradientConfiguration';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhonePipe, HoverBoldDirective, HoverGradientBorderDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  phoneMode: typeof PhoneMode = PhoneMode;
  gradientConfiguration: IGradientConfiguration = { 
    delay: 500, 
    colors: [], 
    thickness: 7 
  };

  handleDeleteUser(userId: number): void {
    this.deleteUser.emit(userId);
  }

  fillEmptyField(field: string): string {
    return field || 'Неизвестно';
  }

}
