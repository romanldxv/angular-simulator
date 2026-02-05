import { Component } from '@angular/core';
import './training'
import { Color } from '../enums/Color';
import { Collection } from './collection';
import { IAdvatage } from '../interfaces/IAdvantage';
import { FormsModule } from '@angular/forms';
import { ITourLocation } from '../interfaces/ITourLocation';
import { ITourParticipant } from '../interfaces/ITourParticipant';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  private LAST_VISIT_DATE: string = 'last-visit-date';
  private VISIT_COUNT: string = 'visit-count';
  
  companyName: string = 'румтибет';

  currentTime: string = new Date().toLocaleString();

  isLoadingPage: boolean = true;

  clickerCount: number = 0;
  isClickerActive: boolean = false;

  liveInputText!: string;

  private products: string[] = ['apple', 'carrot', 'milk', 'bread'];
  private colors: Color[] = Object.values(Color);

  private productCollection: Collection<string> = new Collection(this.products);
  private colorCollection: Collection<Color> = new Collection(this.colors);

  selectedTourLocation: string = '';
  selectedTourDate: string = '';
  selectedCountTourParticipants: number = 0;

  tourLocations: ITourLocation[] = [
    { id: 1, title: 'Плато Лаго-Наки' },
    { id: 2, title: 'Ущелье Руфабго' },
    { id: 3, title: 'Гора Фишт' },
    { id: 4, title: 'Гора Чегет' },
    { id: 5, title: 'Софийские озера' }
  ]

  tourParticipants: ITourParticipant[] = [
    { id: 1, minCount: 4, maxCount: 6 },
    { id: 2, minCount: 6, maxCount: 10 },
    { id: 3, minCount: 10, maxCount: 18 }
  ]

  advantages: IAdvatage[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      iconName: 'ic-experienced-guide'
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      iconName: 'ic-loyal-prices'
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      iconName: 'ic-safe-hiking'
    }
  ]
  
  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();

    setTimeout(() => {
      this.isLoadingPage = false;
    }, 2000)

    setInterval(() => {
      this.currentTime = new Date().toLocaleString();
    }, 1000)
  }

  private isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

  private saveLastVisitDate(): void {
    const todayDate: Date = new Date();
    localStorage.setItem(this.LAST_VISIT_DATE, todayDate.toString());
  }

  private saveVisitCount(): void {
    let visitCount: number = JSON.parse(localStorage.getItem(this.VISIT_COUNT) || '0') + 1;
    localStorage.setItem(this.VISIT_COUNT, JSON.stringify(visitCount));
  }

  activateInteractive() {
    this.isClickerActive ? this.isClickerActive = false : this.isClickerActive = true;
  }

  addOne() {
    this.clickerCount++;
  }

  subtractOne() {
    if (this.clickerCount > 0) {
      this.clickerCount--;
    }
  }

}