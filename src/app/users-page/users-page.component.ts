import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable, startWith, tap, map, combineLatestWith, BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../../interfaces/IUser';
import { UserCardComponent } from "../user-card/user-card.component";
import { CreateUserComponent } from "../create-user/create-user.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersFilterComponent } from "../users-filter/users-filter.component";

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  private userService: UserService = inject(UserService);

  createdUser!: IUser;
  users$: Observable<IUser[]> = this.userService.users$;
  private searchingUsersSubject: BehaviorSubject<string> = new BehaviorSubject('');
  searchedUsers$: Observable<string> = this.searchingUsersSubject.asObservable();
  filteredUsers$: Observable<IUser[]> = this.searchedUsers$.pipe(
    combineLatestWith(this.users$),
    map(([term, users]: [string, IUser[]]) => {
      const filteredUsers: IUser[] = users.filter((user: IUser) => user.name.toLowerCase().startsWith(term.toLowerCase()));
      return filteredUsers;
    })
  );

  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users))
      ).subscribe();
  }

  createUser(newUser: IUser): void {
    this.userService.addUser(newUser);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId);
  }

  updateSearchingUsers(text: string): void {
    this.searchingUsersSubject.next(text);
  }

}
