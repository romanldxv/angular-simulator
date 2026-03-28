import { Component, inject } from '@angular/core';
import { LoaderService } from '../loader.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  loaderService: LoaderService = inject(LoaderService);

  loaderStatus: Observable<boolean> = this.loaderService.isLoading$;

}
