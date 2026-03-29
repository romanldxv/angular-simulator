import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserApiService } from './user-api.service';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(newUsers: IUser[]) {
    this.usersSubject.next(newUsers);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    return this.userApiService.getUsers();
  }

}
