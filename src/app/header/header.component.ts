import { Component, inject, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
import { INavigationLink } from '../../interfaces/INavigationLink';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from "@angular/forms";
import { faMoon, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsyncPipe, NgClass } from '@angular/common';
import { ThemeService } from '../theme.service';
import { map, Observable } from 'rxjs';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { ITheme } from '../../interfaces/ITheme';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ToggleSwitchModule, FormsModule, FontAwesomeModule, NgClass, AsyncPipe, SelectButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  toastService: ToastService = inject(ToastService);
  themeService: ThemeService = inject(ThemeService);

  isDarkMode$: Observable<boolean> = this.themeService.colorMode$.pipe(
    map((theme: 'light' | 'dark') => {
      return theme === 'light' ? false : true;
    })
  );
  companyName: string = 'румтибет';
  currentTime: string = new Date().toLocaleString();
  currentWidget: 'clicker' | 'date' = 'date';
  clickerCount: number = 0;
  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;
  currentNameTheme!: string;

  navigationLinks: INavigationLink[] = [
    { id: 1, title: "Главная", routerLink: "", testingId: "main-ref" },
    { id: 2, title: "Пользователи", routerLink: "users", testingId: "users-ref" }
  ];
  themes: ITheme[] = this.themeService.themes;

  constructor() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleString();
    }, 1000);
  }

  ngOnInit(): void {
    this.currentNameTheme = this.themeService.getTheme().name;
  }

  toggleWidget(widget: 'clicker' | 'date'): void {
    this.currentWidget = widget;
    this.toastService.showSuccess("Виджет изменён!");
  }

  toggleColorMode(event: ToggleSwitchChangeEvent) {
    this.themeService.setColorMode(event.checked ? 'dark' : 'light');
  }

  onThemeChange(event: SelectButtonChangeEvent) {
    let newTheme: ITheme | undefined = this.themes.find((theme: ITheme) => theme.name === event.value);
    this.themeService.setTheme(newTheme ?? this.themeService.getTheme());
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


