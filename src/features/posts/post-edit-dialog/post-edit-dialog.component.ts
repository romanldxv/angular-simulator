import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostService } from '../post.service';
import { tap, catchError, of } from 'rxjs';
import { ToastService } from '../../../app/services/toast.service';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent implements OnInit {

  private postService: PostService = inject(PostService);
  private toastService: ToastService = inject(ToastService);
  private fb: FormBuilder = inject(FormBuilder);

  private ref: DynamicDialogRef | undefined;
  private config!: DynamicDialogConfig;
  editPostForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    tags: [[], [Validators.required]],
    views: ['', [Validators.required]],
  });

  constructor(ref: DynamicDialogRef, config: DynamicDialogConfig) {
    this.ref = ref;
    this.config = config;
  }
  
  ngOnInit(): void {
    this.editPostForm.setValue({
      title: this.config.data.title,
      tags: this.config.data.tags,
      views: this.config.data.views
    })
  }

  onSave(): void {
    const updatedTitle: string = this.editPostForm.controls['title'].value;
    const updatedTags: string[] = this.editPostForm.controls['tags'].value;
    const updatedViews: number = Number(this.editPostForm.controls['views'].value);
    this.postService.updatePost(this.config.data, updatedTitle, updatedTags, updatedViews)
      .pipe(
        tap(() => this.ref?.close()),
        catchError(() => {
          this.toastService.showError('Неудалось изменить пост');
          return of();
        })
      ).subscribe();
  }

}
