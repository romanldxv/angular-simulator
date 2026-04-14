import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { delay, distinctUntilChanged, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent{

  @Output() searchUsersChange: EventEmitter<string> = new EventEmitter<string>();
  searchUsersInput: FormControl<string> = new FormControl('', { nonNullable: true });
  
  constructor() {
    this.searchUsersInput.valueChanges.pipe(
      distinctUntilChanged(),
      delay(200),
      takeUntilDestroyed()
    ).subscribe(this.searchUsersChange);
  }
}
