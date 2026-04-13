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
  readonly USERS_KEY = 'users';

  setUsers(newUsers: IUser[]): void {
    this.usersSubject.next(newUsers);
    this.localStorageService.setItem(this.USERS_KEY, newUsers);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(isRefresh: boolean): Observable<IUser[]> {
    this.loaderService.showLoader();
    const localStorageUsers: IUser[] | null = this.localStorageService.getItem(this.USERS_KEY);
    if (localStorageUsers && !isRefresh) {
      return of(localStorageUsers).pipe(
        finalize(() => {
          this.loaderService.hideLoader();
        })
      );
    }

    return this.userApiService.getUsers()
      .pipe(
        tap((users: IUser[]) => this.saveUsersToStorage(users)),
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

  deleteUser(deletedUser: IUser): void {
    const updatedUsers: IUser[] = this.getUsers().filter((user: IUser) => user.id !== deletedUser.id);
    this.setUsers(updatedUsers);
  }

  private saveUsersToStorage(savedUsers: IUser[]): void {
    this.localStorageService.setItem(this.USERS_KEY, savedUsers);
  }

}
