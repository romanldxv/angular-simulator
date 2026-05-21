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

  private colorModeSubject!: BehaviorSubject<'light' | 'dark'>;
  colorMode$!: Observable<'light' | 'dark'>;
  private themeSubject!: BehaviorSubject<ITheme>;
  theme$!: Observable<ITheme>;
  themes!: ITheme[];
  readonly COLOR_MODE_KEY = 'color-mode';
  readonly THEME_KEY = 'theme';

  constructor() {
    this.themes = [
      { name: Theme.LARA, preset: Lara },
      { name: Theme.AURA, preset: Aura },
      { name: Theme.NORA, preset: Nora },
    ];

    this.initTheme();
    this.initColorMode();
  }

  initTheme(): void {
    const savedNameTheme: string | null = this.localStorageService.getItem(this.THEME_KEY);
    const savedTheme: ITheme = savedNameTheme ? this.themes.find((theme: ITheme) => theme.name === savedNameTheme)! : this.themes[0];

    usePreset(savedTheme.preset);
    this.themeSubject = new BehaviorSubject<ITheme>(savedTheme!);
    this.theme$ = this.themeSubject.asObservable();

    this.theme$.pipe(
      distinctUntilChanged(),
      tap((theme: ITheme) => {
        usePreset(theme.preset);
        this.localStorageService.setItem(this.THEME_KEY, theme.name);
      })
    ).subscribe();
  }

  initColorMode(): void {
    const savedColorMode: 'light' | 'dark' | null = this.localStorageService.getItem(this.COLOR_MODE_KEY);

    this.colorModeSubject = new BehaviorSubject<'light' | 'dark'>(savedColorMode ?? 'light');
    this.colorMode$ = this.colorModeSubject.asObservable();

    this.colorMode$.pipe(
      distinctUntilChanged(),
      tap((colorMode: 'light' | 'dark') => {
        const element = document.querySelector('html')!;

        colorMode === 'light' ? element.classList.remove('my-app-dark') : element.classList.add('my-app-dark');
        this.localStorageService.setItem(this.COLOR_MODE_KEY, colorMode);
      })
    ).subscribe();
  }

  setColorMode(colorMode: 'light' | 'dark') {
    this.colorModeSubject.next(colorMode);
  }

  getColorMode(): 'light' | 'dark' {
    return this.colorModeSubject.getValue();
  }

  setTheme(theme: ITheme) {
    this.themeSubject.next(theme);
  }

  getTheme(): ITheme {
    return this.themeSubject.getValue();
  }

}
