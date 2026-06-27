import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPost } from '../../../interfaces/IPost';
import { PostService } from '../post.service';
import { tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../../../app/services/toast.service';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  private postService: PostService = inject(PostService);
  private toastService: ToastService = inject(ToastService);
  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);

  createPostForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
    tags: [[], [Validators.required]],
    reactions: this.fb.group({
      likes: ['', [Validators.required]],
      dislikes: ['', [Validators.required]]
    }),
    views: ['', [Validators.required]],
  });

  onSubmit(): void {
    const newPost: IPost = { ...this.createPostForm.value, userId: 5 };
    this.postService.addPost(newPost)
      .pipe(
        tap(() => this.router.navigate(['/posts'])),
        catchError(() => {
          this.toastService.showError('Неудалось добавить пост');
          return of();
        })
      ).subscribe();
  }

}
