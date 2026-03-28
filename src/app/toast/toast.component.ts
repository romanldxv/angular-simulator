import { Component, inject } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ToastType } from '../../enums/ToastType';
import { IToast } from '../../interfaces/IToast';
import { ToastService } from '../toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  imports: [NgTemplateOutlet, AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {

  toastService: ToastService = inject(ToastService);
  
  toastType: typeof ToastType = ToastType;
  showingToasts$: Observable<IToast[]> = this.toastService.toasts$;

  closeMessage(message: IToast): void {
    this.toastService.closeToast(message);
  }

}
