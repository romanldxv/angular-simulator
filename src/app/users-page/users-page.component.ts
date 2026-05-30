import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable, tap, map, combineLatest, BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../../interfaces/IUser';
import { UserCardComponent } from "../user-card/user-card.component";
import { CreateUserComponent } from "../create-user/create-user.component";
import { UsersFilterComponent } from "../users-filter/users-filter.component";

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  private userService: UserService = inject(UserService);

  users$: Observable<IUser[]> = this.userService.users$;
  private filteredUsersSubject: BehaviorSubject<string> = new BehaviorSubject('');
  filteredUsers$: Observable<IUser[]> = combineLatest([this.users$, this.filteredUsersSubject])
    .pipe(
      map(([users, term]: [IUser[], string]) => {
        return users.filter((user: IUser) => user.name.toLowerCase().startsWith(term.toLowerCase()));
      })
    );

  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users))
      ).subscribe();
  }

  onCreateUser(newUser: IUser): void {
    this.userService.addUser(newUser);
  }

  onDeleteUser(userId: number): void {
    this.userService.deleteUser(userId);
  }

  onFilterUsers(text: string): void {
    this.filteredUsersSubject.next(text);
  }

}
