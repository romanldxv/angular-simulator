import './training';
import { Component, inject, OnInit } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from './services/local-storage.service';
import { ToastComponent } from "./toast/toast.component";
import { LoaderComponent } from "./loader/loader.component";
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../features/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ToastComponent, LoaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent implements OnInit {

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private authService: AuthService = inject(AuthService);

  readonly LAST_VISIT_DATE_KEY: string = 'last-visit-date';
  readonly VISIT_COUNT_KEY: string = 'visit-count';
  private products: string[] = ['apple', 'carrot', 'milk', 'bread'];
  private colors: Color[] = Object.values(Color);
  private productCollection: Collection<string> = new Collection(this.products);
  private colorCollection: Collection<Color> = new Collection(this.colors);

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
  }

  ngOnInit(): void {
    //this.authService.initAuth();
  }

  private isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

  private saveLastVisitDate(): void {
    const todayDate: Date = new Date();
    this.localStorageService.setItem(this.LAST_VISIT_DATE_KEY, todayDate);
  }

  private saveVisitCount(): void {
    let visitCount: number = (this.localStorageService.getItem<number>(this.VISIT_COUNT_KEY) || 0) + 1;
    this.localStorageService.setItem(this.VISIT_COUNT_KEY, visitCount);
  }

}