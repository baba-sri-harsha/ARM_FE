import { MessageVo } from './../../../models/messageVo';
import { Message } from './../../../models/message';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() taskId!: number;
  messageValue: string = '';

  messages: Message[] = [];
  public userProfile: KeycloakProfile = {};
  userProfileName: string | undefined = '';

  constructor(
    private _messageService: MessageService,
    private _authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userProfile = await this._authService.loadUserProfile();
    this.userProfileName = this.userProfile.username;
    // write the taskId in the arguments from  the input tag
    this._messageService.getMessageByTaskId(this.taskId).subscribe((data) => {
      this.messages = data;
    });
    console.log(this.userProfileName);
  }

  // onKey(event: any) {
  //   this.messageValue = event.currentTarget.value;
  //   console.log(this.messageValue);
  // }

  sendMessage(): void {
    if ((this.messageValue = '')) {
      alert('please Enter the message');
    } else {
      let message: MessageVo = {
        taskId: 1,
        fromUserName: this.userProfileName,
        toUserName: 'baba',
        messageText: this.messageValue
      };

      this._messageService.createMessage(message);
      console.log(`Inside message ${message.taskId}`);
    }
  }
}
