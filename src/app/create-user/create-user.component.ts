import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {

  private formBuilder: FormBuilder = inject(FormBuilder);

  @Output() userChange: EventEmitter<IUser> = new EventEmitter<IUser>();
  createUserForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', [Validators.maxLength(100)]],
    address: this.formBuilder.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.maxLength(50)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      geo: this.formBuilder.group({
        lat: ['', [Validators.required]],
        lng: ['', [Validators.required]]
      })
    }),
    company: this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', [Validators.maxLength(200)]],
      bs: ['', [Validators.maxLength(100)]]
    })
  });

  onSubmit(): void {
    Object.values(this.createUserForm.controls).forEach((control: AbstractControl) => this.prepareForm(control));
    const newUser: IUser = { id: Date.now(), ...this.createUserForm.value };
    this.createUserForm.reset();

    this.userChange.emit(newUser);
  }

  prepareForm(control: AbstractControl) {
    if (control instanceof FormGroup) {
      Object.values(control.controls).forEach((nestedControl: AbstractControl) => this.prepareForm(nestedControl))
    } else if (control instanceof FormControl) {
      if (!control.hasValidator(Validators.required) && control.value === '') {
        control.patchValue('Неизвестно');
      }
    }
  }

}
