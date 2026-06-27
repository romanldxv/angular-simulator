import { Component, inject, OnInit } from '@angular/core';
import { TableModule, TablePageEvent } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { PostService } from '../post.service';
import { finalize, Observable, tap, catchError, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IPost } from '../../../interfaces/IPost';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { ToastService } from '../../../app/services/toast.service';

@Component({
  selector: 'app-posts',
  imports: [TableModule, SkeletonModule, AsyncPipe, ContextMenuModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  standalone: true
})
export class PostsComponent implements OnInit {

  postService: PostService = inject(PostService);
  dialogService: DialogService = inject(DialogService);
  private toastService: ToastService = inject(ToastService);
  private router: Router = inject(Router);

  posts$: Observable<IPost[]> = this.postService.posts$;
  isLoading: boolean = true;
  selectedPost: IPost | null = null;
  first: number = 0;
  currentPage: number = 1;
  rowsOnPage: number = 10;
  totalRecords!: number;
  ref: DynamicDialogRef | undefined;
  actionsForPost: MenuItem[] = [
    { label: 'View', command: () => this.viewPage(this.selectedPost?.id!) },
    { label: 'Edit', command: () => this.onEditPost() },
    { label: 'Delete', command: () => this.deletePost(this.selectedPost?.id!) }
  ];

  ngOnInit(): void {
    this.postService.loadPosts()
      .pipe(
        tap((posts: IPost[]) => {
          this.postService.setPosts(posts);
          this.totalRecords = this.postService.total;
        }),
        catchError(() => {
          this.toastService.showError('Неудалось загрузить посты');
          return of([]);
        }),
        finalize(() => this.isLoading = false)
      ).subscribe();
  }

  viewPage(postId: number): void {
    this.router.navigate([`/posts/${ postId }`]);
  }

  deletePost(postId: number): void {
    this.postService.deletePost(postId)
      .pipe(
        tap(() => this.totalRecords = this.postService.total),
        catchError(() => {
          this.toastService.showError('Неудалось удалить пост');
          return of();
        })
      ).subscribe();
  }

  onEditPost() {
    this.ref = this.dialogService.open(PostEditDialogComponent, { 
      data: this.selectedPost,
      header: 'Edit post',
      modal: true,
      closable: true
    })!;
  }

  onPageChange(event: TablePageEvent): void {
    this.isLoading = true;
    this.currentPage = event.first / event.rows + 1;
    this.first = event.first;
    this.rowsOnPage = event.rows;

    this.postService.loadPosts(event.rows, event.first).pipe(
      tap((posts: IPost[]) => {
        this.postService.setPosts(posts);
        this.totalRecords = this.postService.total;
      }),
      catchError(() => {
        this.toastService.showError('Неудалось загрузить посты');
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

}
