import { Component, inject } from '@angular/core';
import { ToastService } from '../toast.service';
import { INavigationLink } from '../../interfaces/INavigationLink';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  toastService: ToastService = inject(ToastService);

  companyName: string = 'румтибет';
  currentTime: string = new Date().toLocaleString();
  currentWidget: 'clicker' | 'date' = 'date';
  clickerCount: number = 0;

  navigationLinks: INavigationLink[] = [
    { id: 1, title: "Главная", routerLink: "", testingId: "main-ref" },
    { id: 2, title: "Пользователи", routerLink: "users", testingId: "users-ref" }
  ];

  constructor() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleString();
    }, 1000);
  }

  toggleWidget(widget: 'clicker' | 'date'): void {
    this.currentWidget = widget;
    this.toastService.showSuccess("Виджет изменён!");
  }

  increaseCounter(): void {
    this.clickerCount++;
  }

  decreaseCounter(): void {
    if (this.clickerCount > 0) {
      this.clickerCount--;
    }
  }

}
