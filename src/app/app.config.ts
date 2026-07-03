import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { PrimeNG, providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { ITheme } from '../interfaces/ITheme';
import { Preset } from '@primeuix/themes/types';
import { Theme } from '../enums/Theme';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import Lara from "@primeuix/themes/lara";
import Aura from "@primeuix/themes/aura";
import Nora from "@primeuix/themes/nora";
import { logInterceptor } from './interceptors/log.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DialogService } from 'primeng/dynamicdialog';

function getTheme(): Preset {
  const themes: ITheme[] = [
    { name: Theme.LARA, preset: Lara },
    { name: Theme.AURA, preset: Aura },
    { name: Theme.NORA, preset: Nora },
  ];

  const themeFromStorage: string | null = localStorage.getItem('theme');
  const savedThemeName: Theme = themeFromStorage ? themeFromStorage as Theme : Theme.LARA;
  const savedTheme: ITheme = themes.find((theme: ITheme) => theme.name === savedThemeName) ?? themes[0];
  return savedTheme.preset;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: getTheme(),
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    }),
    DialogService,
    provideHttpClient(withInterceptors([logInterceptor, errorInterceptor])),
    provideAnimationsAsync()
  ]
};