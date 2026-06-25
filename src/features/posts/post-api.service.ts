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

  deletePost(postId: number): Observable<IPost> {
    return this.http.delete<IPost>(`https://dummyjson.com/posts/${ postId }`)
  }

}
