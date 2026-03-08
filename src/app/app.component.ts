import { Component, inject } from '@angular/core';
import { Color } from '../enums/Color';
import { ToastType } from '../enums/ToastType';
import { IToast } from '../interfaces/IToast';
import { Collection } from './collection';
import { IAdvatage } from '../interfaces/IAdvantage';
import { FormsModule } from '@angular/forms';
import { ITourLocation } from '../interfaces/ITourLocation';
import { ITourParticipant } from '../interfaces/ITourParticipant';
import { IDirection } from '../interfaces/IDirection';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { ITravelBlog } from '../interfaces/ITravelBlog';
import { ToastService } from './toast.service';
import { LocalStorageService } from './local-storage.service';
import './training';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DecimalPipe, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {

  toastService: ToastService = inject(ToastService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  companyName: string = 'румтибет';
  currentTime: string = new Date().toLocaleString();
  isLoadingPage: boolean = true;
  clickerCount: number = 0;
  currentWidget: 'clicker' | 'date' = 'date';
  liveInputText!: string;
  selectedTourLocation!: string;
  selectedTourDate!: string;
  selectedCountTourParticipants!: number;
  toastType: typeof ToastType = ToastType;
  readonly LAST_VISIT_DATE_KEY: string = 'last-visit-date';
  readonly VISIT_COUNT_KEY: string = 'visit-count';
  private products: string[] = ['apple', 'carrot', 'milk', 'bread'];
  private colors: Color[] = Object.values(Color);
  private productCollection: Collection<string> = new Collection(this.products);
  private colorCollection: Collection<Color> = new Collection(this.colors);

  tourLocations: ITourLocation[] = [
    { id: 1, title: 'Плато Лаго-Наки' },
    { id: 2, title: 'Ущелье Руфабго' },
    { id: 3, title: 'Гора Фишт' },
    { id: 4, title: 'Гора Чегет' },
    { id: 5, title: 'Софийские озера' }
  ];

  tourParticipants: ITourParticipant[] = [
    { id: 1, minCount: 4, maxCount: 6 },
    { id: 2, minCount: 6, maxCount: 10 },
    { id: 3, minCount: 10, maxCount: 18 }
  ];

  advantages: IAdvatage[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      iconName: 'experienced-guide'
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      iconName: 'loyal-prices'
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      iconName: 'safe-hiking'
    }
  ];

  directions: IDirection[] = [
    {
      id: 1,
      title: 'Озеро возле гор',
      subtitle: 'романтическое приключение',
      rating: 4.9,
      price: 480,
      imageName: 'lake-near-mountains'
    },
    {
      id: 2,
      title: 'Ночь в горах',
      subtitle: 'в компании друзей',
      rating: 4.5,
      price: 500,
      imageName: 'night-in-mountains'
    },
    {
      id: 3,
      title: 'Растяжка в горах',
      subtitle: 'для тех, кто забоится о себе',
      rating: 5.0,
      price: 230,
      imageName: 'stretching-in-mountains'
    }
  ];

  travelBlogs: ITravelBlog[] = [
    {
      id: 1,
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      imageName: 'beautiful-italy'
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
      imageName: 'world-open'
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку? ',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      imageName: 'traveling-alone'
    },
    {
      id: 4,
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023',
      imageName: 'india'
    }
  ];
  
  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();

    setTimeout(() => {
      this.isLoadingPage = false;
    }, 2000);

    setInterval(() => {
      this.currentTime = new Date().toLocaleString();
    }, 1000);
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

  toggleWidget(widget: 'clicker' | 'date'): void {
    this.currentWidget = widget;
    this.showToast(this.toastType.SUCCESS, "Виджет изменён!");
  }

  increaseCounter(): void {
    this.clickerCount++;
  }

  decreaseCounter(): void {
    if (this.clickerCount > 0) {
      this.clickerCount--;
    }
  }

  showToast(toastType: ToastType, toastText: string): void {
    this.toastService.addToast(toastType, toastText);
  }

  closeMessage(message: IToast): void {
    this.toastService.closeToast(message);
  }

}