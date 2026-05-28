import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { usePreset } from '@primeuix/themes';
import Lara from "@primeuix/themes/lara";
import Aura from "@primeuix/themes/aura";
import Nora from "@primeuix/themes/nora";
import { ITheme } from '../interfaces/ITheme';
import { Theme } from '../enums/Theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  readonly IS_DARK_MODE_KEY: string = 'is-dark-mode';
  readonly THEME_KEY: string = 'theme';

  themes: ITheme[] = [
    { name: Theme.LARA, preset: Lara },
    { name: Theme.AURA, preset: Aura },
    { name: Theme.NORA, preset: Nora }
  ];

  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.initColorMode());
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable().pipe(
    tap((isDarkMode: boolean) => {
      const element = document.querySelector('html')!;
      isDarkMode ? element.classList.add('my-app-dark') : element.classList.remove('my-app-dark');
    })
  );

  private themeSubject: BehaviorSubject<ITheme> = new BehaviorSubject<ITheme>(this.initTheme());
  theme$: Observable<ITheme> = this.themeSubject.asObservable().pipe(
    distinctUntilChanged(),
    tap((theme: ITheme) => usePreset(theme.preset)),
  );

  private initTheme(): ITheme {
    const savedThemeName: Theme | null = this.localStorageService.getItem(this.THEME_KEY);
    return this.themes.find((theme: ITheme) => theme.name === savedThemeName) ?? this.themes[0];
  }

  private initColorMode(): boolean {
    return this.localStorageService.getItem(this.IS_DARK_MODE_KEY) ?? false;
  }

  setColorMode(isDarkMode: boolean): void {
    this.isDarkModeSubject.next(isDarkMode);
    this.localStorageService.setItem(this.IS_DARK_MODE_KEY, isDarkMode);
  }

  getColorMode(): boolean {
    return this.isDarkModeSubject.getValue();
  }

  setTheme(newTheme: ITheme): void {
    this.themeSubject.next(newTheme);
    this.localStorageService.setItem(this.THEME_KEY, newTheme.name);
  }

  getTheme(): ITheme {
    return this.themeSubject.getValue();
  }

}
