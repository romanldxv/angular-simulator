import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomePageComponent
  },
  { 
    path: 'users', 
    loadComponent: () => import('./users-page/users-page.component').then(m => m.UsersPageComponent)
  },
  { 
    path: '**', 
    loadComponent: () => import('./not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  }
];
