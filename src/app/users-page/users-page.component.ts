import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable, startWith, tap, map, combineLatestWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../../interfaces/IUser';
import { UserCardComponent } from "../user-card/user-card.component";
import { CreateUserComponent } from "../create-user/create-user.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, ReactiveFormsModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  private userService: UserService = inject(UserService);

  users$: Observable<IUser[]> = this.userService.users$;
  createdUser!: IUser;
  searchUsersInput: FormControl<string> = new FormControl('', { nonNullable: true });
  filteredUsers$: Observable<IUser[]> = this.searchUsersInput.valueChanges.pipe(
    startWith(''),
    combineLatestWith(this.users$),
    map(([term, users]: [string, IUser[]]) => {
      const filteredUsers: IUser[] = users.filter((user: IUser) => user.name.toLowerCase().startsWith(term.toLowerCase()));
      return filteredUsers;
    })
  );

  ngOnInit(): void {
    this.userService.loadUsers(false)
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users))
      ).subscribe();
  }

  createUser(newUser: IUser): void {
    this.userService.addUser(newUser);
  }

  deleteUser(deletedUser: IUser): void {
    this.userService.deleteUser(deletedUser);
  }

  refreshUsers(): void {
    this.userService.loadUsers(true)
    .pipe(
      tap((users: IUser[]) => this.userService.setUsers(users))
    ).subscribe();;
  }

}
