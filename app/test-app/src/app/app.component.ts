import {Component} from '@angular/core';
import {NgDynamoSync, EventName} from 'ng-dynamosync';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private shoppingItems = [];
  private chats = [];
  private serverDomain = 'http://54.213.212.103:3000';
  private title = 'hello';
  private sub1: Subscription;
  private sub2: Subscription;

  ngOnInit() {
    this.sub1 = new NgDynamoSync('ShoppingList', this.serverDomain).bindToListModel(this.shoppingItems);
    this.sub2 = new NgDynamoSync('Chat', this.serverDomain).onlyAllowEventNames(EventName.INSERT).bindToListModel(this.chats);
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
