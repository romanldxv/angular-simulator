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

  addToast(toastType: ToastType, toastText: string): void {
    const toast: IToast = { id: Date.now(), type: toastType, text: toastText };
    this.toasts = [toast, ...this.toasts];

    setTimeout(() => {
      this.closeToast(toast);
    }, 5000);
  }

  closeToast(closingToast: IToast): void {
    this.toasts = this.toasts.filter((toast: IToast) => toast.id !== closingToast.id);
  }

}
