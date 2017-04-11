import {Component, Input} from '@angular/core';
import {ShoppingItem} from '../models/shoppingItem';
import {FormControl} from '@angular/forms';
import {Http} from '@angular/http';
import {SERVER_URL} from '../../common/config';

@Component({
  selector: 'shopping-list',
  templateUrl: 'shoppingList.component.html',
  styleUrls: ['shoppingList.component.css']
})

export class ShoppingListComponent {
  title = 'Shopping List';

  @Input()
  shoppingItems: ShoppingItem[];

  private newItemFormControl: FormControl;

  constructor(private http: Http) {
    this.newItemFormControl = new FormControl('', []);
  }

  postNewItem() {
    this.http.post(SERVER_URL + '/shoppingItems', {contents: this.newItemFormControl.value}).toPromise()
      .then(() => {})
      .catch(err => {console.log(err)})
  }

  deleteItem(id: string) {
    this.http.delete(SERVER_URL + '/shoppingItems/' + id).toPromise()
      .then(() => {})
      .catch(err => {console.log(err)})
  }

  finishItem(id: string) {
    this.http.put(SERVER_URL + '/shoppingItems/' + id + '/finish', {}).toPromise()
      .then(() => {})
      .catch(err => {console.log(err)})
  }

}
