import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {ChatsComponent} from "./chats.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
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
