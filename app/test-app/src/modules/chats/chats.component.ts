import {Component, Input} from "@angular/core";
import {Http} from "@angular/http";
import {SERVER_URL} from "../../common/config";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'chats',
  templateUrl: 'chats.component.html',
  styleUrls: ['chats.component.css']
})

export class ChatsComponent {
  title = 'Chats';

  @Input()
  chats: any;

  private nameFormControl: FormControl;
  private contentsFormControl: FormControl;

  constructor(private http: Http) {
    this.nameFormControl = new FormControl('', []);
    this.contentsFormControl = new FormControl('', []);
  }

  submitChat() {

    const name = this.nameFormControl.value;
    const contents = this.contentsFormControl.value;

    this.http.post(SERVER_URL + '/chats', {name, contents})
      .subscribe(
        response => {

        },
        error => {
          console.log(error);
        }
      );
  }

}
