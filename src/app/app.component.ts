import { Component } from '@angular/core';
import './training'
import { Color } from '../enums/Color';
import { Collection } from './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  LAST_VISIT_DATE: string = 'last-visit-date';
  VISIT_COUNT: string = 'visit-count';
  
  companyName: string = 'румтибет';
  
  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
  }

  isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

  saveLastVisitDate(): void {
    const todayDate: Date = new Date();
    localStorage.setItem(this.LAST_VISIT_DATE, todayDate.toString());
  }

  saveVisitCount(): void {
    let visitCount: number | null = JSON.parse(localStorage.getItem(this.VISIT_COUNT)!);
    !visitCount ? visitCount = 1 : visitCount++;
    localStorage.setItem(this.VISIT_COUNT, JSON.stringify(visitCount));
  }

  products: string[] = ['apple', 'carrot', 'milk', 'bread'];
  colors: Color[] = Object.values(Color);

  productCollection: Collection<string> = new Collection(this.products);
  colorCollection: Collection<Color> = new Collection(this.colors);

}