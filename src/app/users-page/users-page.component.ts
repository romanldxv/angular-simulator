import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  private userService: UserService = inject(UserService);

  users$: Observable<IUser[]> = this.userService.loadUsers();


}
