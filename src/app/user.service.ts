import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, finalize, Observable, of, tap } from 'rxjs';
import { UserApiService } from './user-api.service';
import { IUser } from '../interfaces/IUser';
import { LoaderService } from './loader.service';
import { ToastService } from './toast.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private toastService: ToastService = inject(ToastService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  readonly USERS_KEY: string = 'users';

  setUsers(newUsers: IUser[]): void {
    this.usersSubject.next(newUsers);
    this.localStorageService.setItem(this.USERS_KEY, newUsers);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    const usersFromLocalStorage: IUser[] | null = this.localStorageService.getItem(this.USERS_KEY);
    if (usersFromLocalStorage && usersFromLocalStorage.length !== 0) {
      return of(usersFromLocalStorage);
    }
    
    this.loaderService.showLoader();
    return this.userApiService.getUsers()
      .pipe(
        catchError(() => {
          this.toastService.showError('Не удалось загрузить пользователей.');
          return of([]);
        }),
        finalize(() => {
          this.loaderService.hideLoader();
        })
      );
  }

  addUser(newUser: IUser): void {
    const updatedUsers: IUser[] = [...this.getUsers(), newUser];
    this.setUsers(updatedUsers);
  }

  deleteUser(userId: number): void {
    const updatedUsers: IUser[] = this.getUsers().filter((user: IUser) => user.id !== userId);
    this.setUsers(updatedUsers);
  }

}
