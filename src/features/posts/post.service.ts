import { inject, Injectable } from '@angular/core';
import { PostApiService } from './post-api.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { IPostResponse } from '../../interfaces/IPostResponse';
import { IPost } from '../../interfaces/IPost';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  
  private postApiService: PostApiService = inject(PostApiService);

  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();
  total!: number;

  loadPosts(limit: number = 0, skip: number = 0): Observable<IPost[]> {
    return this.postApiService.getPosts(limit, skip)
      .pipe(
        tap((postResponse: IPostResponse) => this.total = postResponse.total),
        map((postResponse: IPostResponse) => postResponse.posts)
      );
  }

  setPosts(newPosts: IPost[]): void {
    this.postsSubject.next(newPosts);
  }

  getPosts(): IPost[] {
    return this.postsSubject.getValue();
  }

  getPostById(postId: number): Observable<IPost> {
    return this.postApiService.getPostById(postId);
  }

  addPost(newPost: IPost): Observable<IPost> {
    return this.postApiService.addPost(newPost)
      .pipe(
        tap((addedPost: IPost) => {
          const posts = this.getPosts();
          this.setPosts([...posts, addedPost]);
        })
      );
  }

  updatePost(post: IPost, title: string, tags: string[], views: number): Observable<IPost> {
    return this.postApiService.updatePost(post, title, tags, views)
      .pipe(
        tap((updatedPost: IPost) => {
          const posts = this.getPosts();
          this.setPosts(posts.map((post: IPost) => post.id === updatedPost.id ? updatedPost : post));
        })
      );
  }

  deletePost(postId: number): Observable<IPost> {
    return this.postApiService.deletePost(postId)
      .pipe(
        tap(() => {
          this.setPosts(this.getPosts()
            .filter((post: IPost) => post.id !== postId)
          );
          this.total -= 1;
        })
      );
  }

}
