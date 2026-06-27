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

  private apiURL = 'https://dummyjson.com/posts';

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.http.get<IPostResponse>(`${ this.apiURL }?limit=${ limit }&skip=${ skip }`);
  }

  getPostById(postId: number): Observable<IPost> {
    return this.http.get<IPost>(`${ this.apiURL }/${ postId }`);
  }

  addPost(newPost: IPost): Observable<IPost> {
    return this.http.post<IPost>(
      `${ this.apiURL }/add`, 
      newPost, 
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  updatePost(post: IPost, title: string, tags: string[], views: number): Observable<IPost> {
    return this.http.patch<IPost>(
      `${ this.apiURL }/${ post.id }`,
      { ...post, title: title, tags: tags, views: views },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  deletePost(postId: number): Observable<IPost> {
    return this.http.delete<IPost>(`${ this.apiURL }/${ postId }`);
  }

}
