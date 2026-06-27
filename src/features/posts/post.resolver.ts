import { ResolveFn } from '@angular/router';
import { PostService } from './post.service';
import { inject } from '@angular/core';
import { IPost } from '../../interfaces/IPost';

export const postResolver: ResolveFn<IPost> = (route, state) => {
  const postService: PostService = inject(PostService);
  return postService.getPostById(parseInt(route.paramMap.get('id')!, 10));
};
