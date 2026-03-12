import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ToastType } from '../../enums/ToastType';
import { IToast } from '../../interfaces/IToast';
import { ToastService } from '../toast.service';


@Component({
  selector: 'app-toast',
  imports: [NgTemplateOutlet],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {

  toastService: ToastService = inject(ToastService);
  
  toastType: typeof ToastType = ToastType;

  closeMessage(message: IToast): void {
    this.toastService.closeToast(message);
  }

}
