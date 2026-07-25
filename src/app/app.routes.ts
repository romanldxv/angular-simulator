import { Routes } from '@angular/router';
import { postResolver } from '../features/posts/post.resolver';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { authGuard } from '../features/auth/auth.guard';
import { adminGuard } from '../features/auth/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home-page/home-page.component').then(
            (m) => m.HomePageComponent,
          ),
      },
      {
        path: '',
        canActivate: [adminGuard],
        children: [
          {
            path: 'users',
            loadComponent: () =>
              import('./users-page/users-page.component').then(
                (m) => m.UsersPageComponent,
              ),
          },
          {
            path: 'posts',
            loadComponent: () =>
              import('../features/posts/posts/posts.component').then(
                (m) => m.PostsComponent,
              ),
          },
          {
            path: 'posts/create',
            loadComponent: () =>
              import('../features/posts/post-create/post-create.component').then(
                (m) => m.PostCreateComponent,
              ),
          },
          {
            path: 'posts/:id',
            loadComponent: () =>
              import('../features/posts/post-detail/post-detail.component').then(
                (m) => m.PostDetailComponent,
              ),
            resolve: {
              post: postResolver,
            },
          },
        ],
      },
      {
        path: '404',
        loadComponent: () =>
          import('./not-found-page/not-found-page.component').then(
            (m) => m.NotFoundPageComponent,
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
