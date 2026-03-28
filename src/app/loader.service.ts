import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  toggleLoader(): void {
    const isLoading: boolean = !this.isLoadingSubject.getValue();
    this.isLoadingSubject.next(isLoading);
  }

}
