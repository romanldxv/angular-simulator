import { Component } from '@angular/core';
import './training'
import { Color } from '../enums/Colors';
import { Collection } from './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'румтибет';

  constructor() {
    saveVisitDate();
    saveEntryCount();
  }

}

function isMainColor(color: string): boolean {
  const mainColors: string[] = Object.values(Color);
  return mainColors.includes(color);
}

function saveVisitDate(): void {
  const todayDate: Date = new Date();
  localStorage.setItem('lastVisitDate', todayDate.toString());
}

function saveEntryCount(): void {
  if (!localStorage.getItem('visitCount')) {
    localStorage.setItem('visitCount', JSON.stringify(1))
  } else {
    let visitCount: number = JSON.parse(localStorage.getItem('visitCount')!);
    localStorage.setItem('visitCount', JSON.stringify(visitCount + 1));
  }
}

const products: string[] = ['apple', 'carrot', 'milk', 'bread'];
const colors: Color[] = Object.values(Color);

const productCollection: Collection<string> = new Collection(products);
const colorCollection: Collection<Color> = new Collection(colors);