import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, of, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private themeSubject: BehaviorSubject<'light' | 'dark'> = new BehaviorSubject<'light' | 'dark'>('light');
  theme$: Observable<'light' | 'dark'> = this.themeSubject.asObservable();
  readonly THEME_KEY = 'theme';

  constructor() {
    let savedTheme: 'light' | 'dark' | null = this.localStorageService.getItem(this.THEME_KEY);
    savedTheme = savedTheme ? savedTheme : 'light';
    this.setTheme(savedTheme!);

    this.theme$.pipe(
      distinctUntilChanged(),
      tap((theme: 'light' | 'dark') => {
        if (theme === 'dark') {
          const element = document.querySelector('html');
          element!.classList.add('my-app-dark');
        }

        if (theme === 'light') {
          const element = document.querySelector('html');
          element!.classList.remove('my-app-dark');
        }
        this.localStorageService.setItem(this.THEME_KEY, theme);
      })
    ).subscribe()
  }

  setTheme(theme: 'light' | 'dark') {
    this.themeSubject.next(theme);
  }

  getTheme(): 'light' | 'dark' {
    return this.themeSubject.getValue();
  }
}
