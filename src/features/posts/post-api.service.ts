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

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.http.get<IPostResponse>(`https://dummyjson.com/posts?limit=${ limit }&skip=${ skip }`);
  }

  getPostById(postId: number): Observable<IPost> {
    return this.http.get<IPost>(`https://dummyjson.com/posts/${ postId }`);
  }

  addPost(newPost: IPost): Observable<IPost> {
    return this.http.post<IPost>(
      'https://dummyjson.com/posts/add', 
      newPost, 
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  updatePost(post: IPost, title: string, tags: string[], views: number): Observable<IPost> {
    return this.http.patch<IPost>(
      `https://dummyjson.com/posts/${ post.id }`,
      { ...post, title: title, tags: tags, views: views },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  deletePost(postId: number): Observable<IPost> {
    return this.http.delete<IPost>(`https://dummyjson.com/posts/${ postId }`);
  }

}
