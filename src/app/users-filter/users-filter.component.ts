import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { delay, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  @Output() filterUsers: EventEmitter<string> = new EventEmitter<string>();
  destroyRef: DestroyRef = inject(DestroyRef)

  filterControl: FormControl<string> = new FormControl('', { nonNullable: true });
  
  ngOnInit(): void {
    this.filterControl.valueChanges.pipe(
      distinctUntilChanged(),
      delay(200),
      tap((text: string) => this.filterUsers.emit(text)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
