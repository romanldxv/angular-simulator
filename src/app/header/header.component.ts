import { Component, inject } from '@angular/core';
import { ToastService } from '../toast.service';
import { INavigationLink } from '../../interfaces/INavigationLink';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from "@angular/forms";
import { faMoon, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsyncPipe, NgClass } from '@angular/common';
import { ThemeService } from '../theme.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ToggleSwitchModule, FormsModule, FontAwesomeModule, NgClass, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  toastService: ToastService = inject(ToastService);
  themeService: ThemeService = inject(ThemeService);

  theme$: Observable<'light' | 'dark'> = this.themeService.theme$;
  isDark$: Observable<boolean> = this.themeService.theme$.pipe(
      map((theme: 'light' | 'dark') => {
        return theme === 'light' ? false : true;
      })
    );
  companyName: string = 'румтибет';
  currentTime: string = new Date().toLocaleString();
  currentWidget: 'clicker' | 'date' = 'date';
  clickerCount: number = 0;
  faMoon: IconDefinition = faMoon;

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

  toggleColorMode() {
    const newTheme: 'light' | 'dark' = this.themeService.getTheme() === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(newTheme);
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
