import { FormControl } from '@angular/forms';
import { TaskVO } from './../../../models/taskVO';
import { KeycloakService } from 'keycloak-angular';
import { MessageVo } from './../../../models/messageVo';
import { Message } from './../../../models/message';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from 'src/app/user/auth.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() taskId!: number;

  messageValue: string = 'trail';
  task!: TaskVO;
  messages: Message[] = [];
  public userProfile: KeycloakProfile = {};
  userProfileName: string | undefined = '';

  receiverName: string | undefined = '';
  roleOfLoggedInUser: string | undefined = '';

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
    private _taskService: TaskService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userMessage.taskId = this.taskId;
    this.userProfile = await this._authService.loadUserProfile();
    this.userMessage.fromUserName = this.userProfile.username;
    this.userProfileName = this.userProfile.username;
    this._messageService.getMessageByTaskId(this.taskId).subscribe((data) => {
      this.messages = data;
    });

    this._taskService.getTaskById(this.taskId).subscribe((task) => {
      this.task = task;
      this.userMessage.toUserName = this.getTheRoles();
      if (this.getTheNames() === 'report_owner') {
        this.receiverName = this.task.taskCreatorFullName;
        this.roleOfLoggedInUser = 'Production Manager';
      } else if (this.getTheNames() === 'manager') {
        this.receiverName = this.task.reportOwnerFullName;
        this.roleOfLoggedInUser = 'Report Owner';
      }
    });

    this.messageInputCtrl.valueChanges.subscribe((message) => {
      if (message) {
        this.userMessage.messageText = message;
      }
    });
  }

  sendMessage(event: MouseEvent): void {
    event.preventDefault();
    if (this.userMessage.messageText === '') {
      alert('Please Enter The Message');
    } else {
      this._messageService.createMessage(this.userMessage).subscribe(() => {
        console.log(this.userMessage);
        this.reloadMessages();
        this.messageInputCtrl.setValue('');
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

  getTheNames(): string {
    let roles =
      this._keycloakService.getKeycloakInstance().realmAccess?.['roles'];
    if (roles?.indexOf('report_owner') != -1) {
      return 'report_owner';
    } else if (roles?.indexOf('manager') != -1) {
      return 'manager';
    }
    return 'report_owner';
  }

  reloadMessages = () => {
    this._messageService
      .getMessageByTaskId(this.task.taskId)
      .subscribe((message) => {
        this.messages = message;
      });
  };
}
