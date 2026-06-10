import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/IUser';
import { HoverBoldDirective } from '../directives/hover-bold.directive';
import { HoverGradientBorderDirective } from '../directives/hover-gradient-border.directive';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule, HoverBoldDirective, HoverGradientBorderDirective],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {

  @Output() createUser: EventEmitter<IUser> = new EventEmitter<IUser>();
  private fb: FormBuilder = inject(FormBuilder);

  createUserForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', [Validators.maxLength(100)]],
    address: this.fb.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.maxLength(50)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      geo: this.fb.group({
        lat: ['', [Validators.required]],
        lng: ['', [Validators.required]]
      })
    }),
    company: this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', [Validators.maxLength(200)]],
      bs: ['', [Validators.maxLength(100)]]
    })
  });

  onSubmit(): void {
    const newUser: IUser = { id: Date.now(), ...this.createUserForm.value };
    this.createUserForm.reset();
    this.createUser.emit(newUser);
  }

}
