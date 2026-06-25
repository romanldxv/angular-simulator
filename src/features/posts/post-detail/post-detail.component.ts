import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  imports: [],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const postId: string | null = this.route.snapshot.paramMap.get('id');
  }

}
