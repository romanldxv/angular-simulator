import { InjectionToken } from '@angular/core';
import { IAppConfiguration } from '../interfaces/IAppConfiguration';

export const APP_CONFIGURATION: InjectionToken<IAppConfiguration> = new InjectionToken<IAppConfiguration>('App configuration');