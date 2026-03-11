import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ToastType } from '../../enums/ToastType';
import { IToast } from '../../interfaces/IToast';
import { ToastService } from '../toast.service';


@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  
  toastService: ToastService = inject(ToastService);

  toastType: typeof ToastType = ToastType;

  closeMessage(message: IToast): void {
    this.toastService.closeToast(message);
  }

}
