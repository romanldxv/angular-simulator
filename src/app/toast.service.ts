import { Injectable } from '@angular/core';
import { IToast } from '../interfaces/IToast';
import { ToastType } from '../enums/ToastType';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  
  private toasts: IToast[] = [];

  getToasts(): IToast[] {
    return this.toasts;
  }

  closeToast(closingToast: IToast): void {
    this.toasts = this.toasts.filter((toast: IToast) => toast.id !== closingToast.id);
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
    this.toasts = [toast, ...this.toasts];

    setTimeout(() => {
      this.closeToast(toast);
    }, 5000);
  }
  
}
