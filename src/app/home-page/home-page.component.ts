import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ITourLocation } from '../../interfaces/ITourLocation';
import { ITourParticipant } from '../../interfaces/ITourParticipant';
import { IDirection } from '../../interfaces/IDirection';
import { IAdvatage } from '../../interfaces/IAdvantage';
import { ITravelBlog } from '../../interfaces/ITravelBlog';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  toastService: ToastService = inject(ToastService);

  liveInputText!: string;
  selectedTourLocation!: string;
  selectedTourDate!: string;
  selectedCountTourParticipants!: number;

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

}
