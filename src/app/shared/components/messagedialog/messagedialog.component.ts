import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Message } from 'src/app/models/message';
import { MessageVo } from 'src/app/models/messageVo';
import { TaskVO } from 'src/app/models/taskVO';
import { TaskService } from 'src/app/services/task/task.service';
import { AuthService } from 'src/app/user/auth.service';
import { MessageService } from '../../services/message.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-messagedialog',
  templateUrl: './messagedialog.component.html',
  styleUrls: ['./messagedialog.component.scss']
})
export class MessagedialogComponent implements OnInit {
  taskId!: number;

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

  messageInputCtrl = new FormControl('');

  constructor(
    private _messageService: MessageService,
    private _authService: AuthService,
    private _keycloakService: KeycloakService,
    private _taskService: TaskService,
    public dialogRef: MatDialogRef<MessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskId = data.taskId;
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

    this.messageInputCtrl.valueChanges.subscribe((message) => {
      if (message) {
        this.userMessage.messageText = message;
      }
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
        this.messageInputCtrl.setValue('');
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
