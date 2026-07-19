import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPost } from '../../../interfaces/IPost';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private config: DynamicDialogConfig = inject(DynamicDialogConfig);

  editPostForm: FormGroup = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    tags: [[], [Validators.required]],
    views: [0, [Validators.required]],
  });

  ngOnInit(): void {
    this.editPostForm.patchValue({
      title: this.config.data.title,
      tags: this.config.data.tags,
      views: this.config.data.views,
    });
  }

  onSave(): void {
    if (this.editPostForm.invalid) {
      return;
    }

    const tags: string[] = Array.isArray(this.editPostForm.value.tags)
      ? this.editPostForm.value.tags
      : this.editPostForm.value.tags.split(',');
    const updatedTags: string[] = tags.filter((tag: string) => tag !== '');
    const updatedPost: IPost = {
      ...this.config.data,
      ...this.editPostForm.value,
      tags: updatedTags,
    };
    this.ref.close(updatedPost);
  }
}
