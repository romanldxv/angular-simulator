import { Component, inject } from '@angular/core';
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {
  faPinterest,
  faSkype,
  faTelegram,
  faVk,
} from '@fortawesome/free-brands-svg-icons';
import { IAppConfiguration } from '../../interfaces/IAppConfiguration';
import { APP_CONFIGURATION } from '../app-configuration.token';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  private appConfig: IAppConfiguration = inject(APP_CONFIGURATION);

  companyName: string = this.appConfig.companyName;
  faTelegram: IconDefinition = faTelegram;
  faVk: IconDefinition = faVk;
  faPinterest: IconDefinition = faPinterest;
  faSkype: IconDefinition = faSkype;
  faAngleRight: IconDefinition = faAngleRight;
  
}
