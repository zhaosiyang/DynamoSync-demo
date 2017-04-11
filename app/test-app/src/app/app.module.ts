import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {ShoppingListModule} from "../modules/shoppingList/shoppingList.module";
import {ChatsModule} from "../modules/chats/chats.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ShoppingListModule,
    ChatsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
