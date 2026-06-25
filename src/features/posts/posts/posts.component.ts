import { Component, inject, OnInit } from '@angular/core';
import { TableModule, TablePageEvent } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { PostService } from '../post.service';
import { finalize, map, Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IPost } from '../../../interfaces/IPost';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { IPostResponse } from '../../../interfaces/IPostResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [TableModule, SkeletonModule, AsyncPipe, ContextMenuModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {

  postService: PostService = inject(PostService);
  private router: Router = inject(Router);

  posts$: Observable<IPost[]> = this.postService.posts$;
  isLoading: boolean = true;
  selectedPost: IPost | null = null;
  first: number = 0;
  currentPage: number = 1;
  rowsOnPage: number = 10;
  totalRecords!: number;
  actionsForPost: MenuItem[] = [
    { label: 'View', command: () => this.viewPage(this.selectedPost?.id!) },
    { label: 'Edit', command: () => this.test() },
    { label: 'Delete', command: () => this.deletePost(this.selectedPost?.id!) }
  ];

  ngOnInit(): void {
    this.postService.loadPosts()
      .pipe(
        tap((posts: IPost[]) => {
          this.postService.setPosts(posts);
          this.totalRecords = this.postService.total;
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
        tap(() => this.totalRecords = this.postService.total)
      ).subscribe();
  }

  test(post?: IPost) {
    console.log(this.selectedPost)
    console.log("2")
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
      finalize(() => this.isLoading = false)
    ).subscribe();
    console.log(`first: ${event.first} rows: ${event.rows}`)
    console.log(`current page: ${this.currentPage}`)
  }

}
