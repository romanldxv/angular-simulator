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
    path: 'posts', 
    loadComponent: () => import('../features/posts/posts/posts.component').then(m => m.PostsComponent)
  },
  { 
    path: 'posts/:id', 
    loadComponent: () => import('../features/posts/post-detail/post-detail.component').then(m => m.PostDetailComponent)
  },
  { 
    path: '**', 
    loadComponent: () => import('./not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  }
];
