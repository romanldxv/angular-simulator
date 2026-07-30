import { Component, inject, OnInit } from '@angular/core';
import { TableModule, TablePageEvent } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { PostService } from '../post.service';
import {
  finalize,
  Observable,
  tap,
  catchError,
  throwError,
  take,
  switchMap,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IPost } from '../../../interfaces/IPost';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { ToastService } from '../../../app/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../../app/services/loader.service';

@Component({
  selector: 'app-posts',
  imports: [TableModule, SkeletonModule, AsyncPipe, ContextMenuModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  standalone: true,
})
export class PostsComponent implements OnInit {

  private postService: PostService = inject(PostService);
  private dialogService: DialogService = inject(DialogService);
  private toastService: ToastService = inject(ToastService);
  private loaderService: LoaderService = inject(LoaderService);
  private router: Router = inject(Router);

  posts$: Observable<IPost[]> = this.postService.posts$;
  isLoading: boolean = true;
  selectedPost: IPost | null = null;
  first: number = 0;
  last: number = 10;
  currentPage: number = 1;
  rowsOnPage: number = 10;
  totalRecords!: number;
  ref: DynamicDialogRef | undefined;
  contextMenuItems: MenuItem[] = [
    { label: 'View', command: () => this.viewPage(this.selectedPost?.id!) },
    { label: 'Edit', command: () => this.onEditPost() },
    { label: 'Delete', command: () => this.deletePost(this.selectedPost?.id!) },
  ];

  ngOnInit(): void {
    this.postService
      .loadPosts()
      .pipe(
        tap((posts: IPost[]) => {
          this.postService.setPosts(posts);
          this.totalRecords = this.postService.total;
        }),
        catchError((error: HttpErrorResponse) => {
          this.toastService.showError('Неудалось загрузить посты');
          return throwError(() => error);
        }),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe();
  }

  viewPage(postId: number): void {
    this.router.navigate([`/posts/${ postId }`]);
  }

  deletePost(postId: number): void {
    this.loaderService.showLoader();
    this.postService
      .deletePost(postId)
      .pipe(
        tap(() => (this.totalRecords = this.postService.total)),
        catchError((error: HttpErrorResponse) => {
          this.toastService.showError('Неудалось удалить пост');
          return throwError(() => error);
        }),
        finalize(() => this.loaderService.hideLoader()),
      )
      .subscribe();
  }

  onEditPost(): void {
    this.dialogService
      .open(PostEditDialogComponent, {
        data: this.selectedPost,
        header: 'Edit post',
        closable: true,
      })
      ?.onClose.pipe(
        tap(() => this.loaderService.showLoader()),
        take(1),
        switchMap((post: IPost) => this.postService.updatePost(post)),
        catchError((error: HttpErrorResponse) => {
          this.toastService.showError('Неудалось изменить пост');
          return throwError(() => error);
        }),
        finalize(() => this.loaderService.hideLoader()),
      )
      .subscribe();
  }

  onPageChange(event: TablePageEvent): void {
    this.isLoading = true;
    this.currentPage = event.first / event.rows + 1;
    this.first = event.first;
    this.rowsOnPage = event.rows;
    this.last = this.first + this.rowsOnPage;

    this.postService
      .loadPosts(event.rows, event.first)
      .pipe(
        tap((posts: IPost[]) => {
          this.postService.setPosts(posts);
          this.totalRecords = this.postService.total;
        }),
        catchError((error: HttpErrorResponse) => {
          this.toastService.showError('Неудалось загрузить посты');
          return throwError(() => error);
        }),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe();
  }

}
