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
          const posts: IPost[] = this.getPosts();
          this.setPosts([...posts, addedPost]);
          this.total++;
        })
      );
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.postApiService.updatePost(post)
      .pipe(
        tap((updatedPost: IPost) => {
          const posts: IPost[] = this.getPosts();
          const updatedPosts: IPost[] = posts.map((post: IPost) => post.id === updatedPost.id ? updatedPost : post);
          this.setPosts(updatedPosts);
        })
      );
  }

  deletePost(postId: number): Observable<IPost> {
    return this.postApiService.deletePost(postId)
      .pipe(
        tap(() => {
          const posts: IPost[] = this.getPosts();
          const updatedPosts: IPost[] = posts.filter((post: IPost) => post.id !== postId);
          this.setPosts(updatedPosts);
          this.total--;
        })
      );
  }

}
