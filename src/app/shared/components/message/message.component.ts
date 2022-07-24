import { TaskVO } from './../../../models/taskVO';
import { KeycloakService } from 'keycloak-angular';
import { MessageVo } from './../../../models/messageVo';
import { Message } from './../../../models/message';
import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from 'src/app/user/auth.service';
import { TaskService } from 'src/app/services/task/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() taskId!: number;

  textElement = document.getElementById('message');

  messageValue: string = '';
  task!: TaskVO;
  messages: Message[] = [];
  public userProfile: KeycloakProfile = {};
  userProfileName: string | undefined = '';

  userMessage: MessageVo = {
    taskId: 0,
    fromUserName: '',
    toUserName: '',
    messageText: ''
  };

  // private dialogRef = null;
  // private dialogData;
  constructor(
    private _messageService: MessageService,
    private _authService: AuthService,
    private _keycloakService: KeycloakService,
    private _taskService: TaskService // private injector: Injector
  ) {
    // this.dialogRef = this.injector.get(MatDialogRef, null);
    // this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
    // this.taskId = data.taskId;
    // this.userMessage.taskId = this.data.taskId;
  }

  async ngOnInit(): Promise<void> {
    this.userMessage.taskId = this.taskId;
    // this.userMessage.taskId = this.data.taskId;

    this.userProfile = await this._authService.loadUserProfile();
    this.userMessage.fromUserName = this.userProfile.username;
    this.userProfileName = this.userProfile.username;
    console.log(this.userProfileName);
    // write the taskId in the arguments from  the input tag
    this._messageService.getMessageByTaskId(this.taskId).subscribe((data) => {
      this.messages = data;
      console.log(this.messages);
      console.log(this.taskId);
      console.log(this.userMessage.taskId);
    });

    this._taskService.getTaskById(this.taskId).subscribe((task) => {
      this.task = task;
      this.userMessage.toUserName = this.getTheRoles();
    });
  }

  onMessage(message: string) {
    console.log(message);
    this.userMessage.messageText = message;
  }

  sendMessage(event: MouseEvent): void {
    event.preventDefault();
    if (this.userMessage.messageText === '') {
      alert('Please Enter The Message');
    } else {
      this._messageService.createMessage(this.userMessage).subscribe(() => {
        console.log(this.userMessage);
        this.reloadMessages();
      });
    }
  }

  getTheRoles(): string | undefined {
    let roles =
      this._keycloakService.getKeycloakInstance().realmAccess?.['roles'];
    if (roles?.indexOf('report_owner') != -1) {
      return this.task.taskCreator;
    } else if (roles?.indexOf('manager') != -1) {
      return this.task.reportOwner;
    }
    return '';
  }

  reloadMessages = () => {
    this._messageService
      .getMessageByTaskId(this.task.taskId)
      .subscribe((message) => {
        this.messages = message;
      });
  };
}