import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { usePreset } from '@primeuix/themes';
import Lara from "@primeuix/themes/lara";
import Aura from "@primeuix/themes/aura";
import Nora from "@primeuix/themes/nora";
import { ITheme } from '../interfaces/ITheme';
import { Theme } from '../enums/Theme';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  private colorModeSubject: BehaviorSubject<'light' | 'dark'> = new BehaviorSubject<'light' | 'dark'>('light');
  colorMode$: Observable<'light' | 'dark'> = this.colorModeSubject.asObservable();
  private themeSubject: BehaviorSubject<ITheme> = new BehaviorSubject<ITheme>({} as ITheme);
  theme$: Observable<ITheme> = this.themeSubject.asObservable();
  themes: ITheme[] = [
    { name: Theme.LARA, preset: Lara },
    { name: Theme.AURA, preset: Aura },
    { name: Theme.NORA, preset: Nora }
  ];
  readonly COLOR_MODE_KEY: string = 'color-mode';
  readonly THEME_KEY: string = 'theme';

  constructor() {
    this.initTheme();
    this.initColorMode();
  }

  private initTheme(): void {
    const savedNameTheme: string | null = this.localStorageService.getItem(this.THEME_KEY);
    const savedTheme: ITheme = savedNameTheme ? this.themes.find((theme: ITheme) => theme.name === savedNameTheme)! : this.themes[0];
    this.themeSubject.next(savedTheme);

    this.theme$.pipe(
      distinctUntilChanged(),
      tap((theme: ITheme) => this.setTheme(theme)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  private initColorMode(): void {
    const savedColorMode: 'light' | 'dark' | null = this.localStorageService.getItem(this.COLOR_MODE_KEY);
    this.colorModeSubject.next(savedColorMode ?? 'light');

    this.colorMode$.pipe(
      tap((colorMode: 'light' | 'dark') => this.setColorMode(colorMode))
    ).subscribe();
  }

  setColorMode(newColorMode: 'light' | 'dark') {
    this.colorModeSubject.next(newColorMode);
    const element = document.querySelector('html')!;
    newColorMode === 'light' ? element.classList.remove('my-app-dark') : element.classList.add('my-app-dark');
    this.localStorageService.setItem(this.COLOR_MODE_KEY, newColorMode);
  }

  getColorMode(): 'light' | 'dark' {
    return this.colorModeSubject.getValue();
  }

  setTheme(newTheme: ITheme) {
    this.themeSubject.next(newTheme);
    usePreset(newTheme.preset);
    this.localStorageService.setItem(this.THEME_KEY, newTheme.name);
  }

  getTheme(): ITheme {
    return this.themeSubject.getValue();
  }

}
