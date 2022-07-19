import { KeycloakProfile } from 'keycloak-js';
import { AuthGuard } from './../../../user/auth.guard';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

// import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from 'src/app/services/task/task.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnChanges {
  public userProfile: KeycloakProfile = {};
  tasks: Task[] = [];
  showLoader: boolean = false;
  dataSource = new MatTableDataSource<Task>();

  displayedColumns: string[] = [
    'requestId',
    'taskDescription',
    'productionCompanyName',
    'projectName',
    'talentName',
    'priority',
    'auditStartDate',
    'auditEndDate',
    'requestRaised',
    'requestClosed',
    'quickActions'
  ];

  constructor(private _taskService: TaskService, private auth: AuthService) {}

  @Input() searchedValue: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.searchResults();
  }

  async ngOnInit(): Promise<void> {
    this.showLoader = true;
    this.dataSource.filter = this.searchedValue;
    this.dataSource.data = this.tasks;

    this.userProfile = await this.auth.loadUserProfile();
    console.log(this.userProfile);
    this._taskService
      .getTasksForLoggedInUser(this.userProfile.username)
      .subscribe((data: Task[]) => {
        this.tasks = data;
      });

    console.log(this.dataSource);
  }

  searchResults = () => {
    this.dataSource.filter = this.searchedValue.trim().toLowerCase();
  };
}
