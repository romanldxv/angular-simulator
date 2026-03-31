import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, finalize, Observable, of } from 'rxjs';
import { UserApiService } from './user-api.service';
import { IUser } from '../interfaces/IUser';
import { LoaderService } from './loader.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private toastService: ToastService = inject(ToastService);
  
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(newUsers: IUser[]): void {
    this.usersSubject.next(newUsers);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
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

}
