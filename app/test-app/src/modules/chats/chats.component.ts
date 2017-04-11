import {Component, Input} from '@angular/core';

@Component({
  selector: 'chats',
  templateUrl: 'chats.component.html',
  styleUrls: ['chats.component.css']
})

export class ChatsComponent {
  title = 'Chats';

  @Input()
  chats: any;
}
