import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ShoppingListComponent} from './shoppingLIst.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    ShoppingListComponent
  ],
  declarations: [
    ShoppingListComponent
  ]
})
export class ShoppingListModule {
}
