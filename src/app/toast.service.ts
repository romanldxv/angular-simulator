import { Injectable } from '@angular/core';
import { IToast } from '../interfaces/IToast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  
  private toasts: IToast[] = [];

  getToasts(): IToast[] {
    return this.toasts;
  }

  addToast(addingToast: IToast): void {
    this.toasts.unshift(addingToast);

    setTimeout(() => {
      this.closeToast(addingToast);
    }, 5000);
  }

  closeToast(closingToast: IToast): void {
    this.toasts = this.toasts.filter((toast: IToast) => toast.id !== closingToast.id);
  }

}
