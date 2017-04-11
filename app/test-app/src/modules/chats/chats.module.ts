import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChatsComponent} from "./chats.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    ChatsComponent
  ],
  declarations: [
    ChatsComponent
  ]
})
export class ChatsModule {
}
