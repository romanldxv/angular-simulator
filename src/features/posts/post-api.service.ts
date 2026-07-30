import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostResponse } from '../../interfaces/IPostResponse';
import { IPost } from '../../interfaces/IPost';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private http: HttpClient = inject(HttpClient);

  private readonly API_URL: string = 'https://dummyjson.com/posts';

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.http.get<IPostResponse>(
      `${ this.API_URL }?limit=${ limit }&skip=${ skip }`,
    );
  }

  getPostById(postId: number): Observable<IPost> {
    return this.http.get<IPost>(`${ this.API_URL }/${ postId }`);
  }

  addPost(newPost: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${ this.API_URL }/add`, newPost);
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${ this.API_URL }/${ post.id }`, { ...post });
  }

  deletePost(postId: number): Observable<IPost> {
    return this.http.delete<IPost>(`${ this.API_URL }/${ postId }`);
  }

}
