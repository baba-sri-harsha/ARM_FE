import { KeycloakProfile } from 'keycloak-js';
import { AuthGuard } from './../../../user/auth.guard';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from 'src/app/services/task/task.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnChanges, AfterViewInit {
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
    this._taskService
      .getTasksForLoggedInUser(this.userProfile.username)
      .subscribe((data: Task[]) => {
        this.dataSource.data = data;
      });

    // console.log(this.dataSource);
  }

  @ViewChild('paginator') paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }

  //for searching inside the table data
  searchResults = () => {
    this.dataSource.filter = this.searchedValue.trim().toLowerCase();
  };
}
