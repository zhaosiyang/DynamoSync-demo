import {Component, Input, ViewChild, ElementRef} from "@angular/core";
import {Http} from "@angular/http";
import {SERVER_URL} from "../../common/config";
import {FormControl} from "@angular/forms";
import {Chat} from "../models/chat";

@Component({
  selector: 'chats',
  templateUrl: 'chats.component.html',
  styleUrls: ['chats.component.css']
})

export class ChatsComponent {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }


  title = 'Chats';

  @Input()
  chats: Chat[];

  private nameFormControl: FormControl;
  private contentsFormControl: FormControl;

  constructor(private http: Http) {
    this.nameFormControl = new FormControl('', []);
    this.contentsFormControl = new FormControl('', []);
  }

  submitChat() {

    const name = this.nameFormControl.value;
    const contents = this.contentsFormControl.value;
    this.contentsFormControl.setValue('');

    this.http.post(SERVER_URL + '/chats', {name, contents})
      .subscribe(
        response => {

        },
        error => {
          console.log(error);
        }
      );
  }

  nameToRGB(name: any) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    let c = (hash & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
  }
}
