import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../../interfaces/IUser';
import { UserCardComponent } from "../user-card/user-card.component";
import { CreateUserComponent } from "../create-user/create-user.component";

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  private userService: UserService = inject(UserService);

  users$: Observable<IUser[]> = this.userService.users$;
  createdUser!: IUser;

  constructor() {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users))
      ).subscribe();
  }

  createUser(newUser: IUser): void {
    const updatedUsers: IUser[] = [...this.userService.getUsers(), newUser];
    this.userService.setUsers(updatedUsers);
  }

}
