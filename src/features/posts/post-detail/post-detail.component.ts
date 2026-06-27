import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../../../interfaces/IPost';

@Component({
  selector: 'app-post-detail',
  imports: [],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
  standalone: true
})
export class PostDetailComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);

  post!: IPost;

  ngOnInit(): void {
    const postId: string | null = this.route.snapshot.paramMap.get('id');
    this.post = this.route.snapshot.data['post'];
  }

}
