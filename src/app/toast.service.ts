import { Injectable } from '@angular/core';
import { IToast } from '../interfaces/IToast';
import { ToastType } from '../enums/ToastType';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  
  private toastsSubject: BehaviorSubject<IToast[]> = new BehaviorSubject<IToast[]>([]);
  toasts$: Observable<IToast[]> = this.toastsSubject.asObservable();

  getToasts(): IToast[] {
    return this.toastsSubject.getValue();
  }

  closeToast(closingToast: IToast): void {
    const newToasts: IToast[] = this.toastsSubject.getValue().filter((toast: IToast) => toast.id !== closingToast.id);
    this.toastsSubject.next(newToasts);
  }

  showWarn(toastText: string) {
    this.addToast(ToastType.WARN, toastText);
  }

  showError(toastText: string) {
    this.addToast(ToastType.ERROR, toastText);
  }

  showSuccess(toastText: string) {
    this.addToast(ToastType.SUCCESS, toastText);
  }

  showInfo(toastText: string) {
    this.addToast(ToastType.INFO, toastText);
  }

  private addToast(toastType: ToastType, toastText: string): void {
    const toast: IToast = { id: Date.now(), type: toastType, text: toastText };
    this.toastsSubject.next([toast, ...this.getToasts()]);

    setTimeout(() => {
      this.closeToast(toast);
    }, 5000);
  }
  
}
