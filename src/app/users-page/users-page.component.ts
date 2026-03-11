import { Component } from '@angular/core';
import { MessageComponent } from "../message/message.component";

@Component({
  selector: 'app-users-page',
  imports: [MessageComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

}
