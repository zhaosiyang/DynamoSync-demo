import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShoppingListComponent} from "./shoppingList.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
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
