import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { PostService } from './post.service';
import { inject } from '@angular/core';
import { IPost } from '../../interfaces/IPost';
import { catchError, finalize, throwError } from 'rxjs';
import { ToastService } from '../../app/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../app/services/loader.service';

export const postResolver: ResolveFn<IPost> = (route: ActivatedRouteSnapshot) => {

  const postService: PostService = inject(PostService);
  const toastService: ToastService = inject(ToastService);
  const loaderService: LoaderService = inject(LoaderService);

  const postId: number = parseInt(route.paramMap.get('id')!, 10);
  loaderService.showLoader();
  return postService.getPostById(postId)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        toastService.showError('Неудалось найти пост');
        return throwError(() => error);
      }),
      finalize(() => loaderService.hideLoader())
    );

};
