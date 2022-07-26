import { KeycloakProfile } from 'keycloak-js';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from 'src/app/services/task/task.service';
import { AuthService } from 'src/app/user/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/shared/components/message/message.component';
import { MatSort } from '@angular/material/sort';

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
    'contractNo',
    'projectName',
    'talentName',
    'priority',
    'auditStartDate',
    'auditEndDate',
    'requestRaised',
    'requestClosed',
    'quickActions'
  ];

  constructor(
    private _taskService: TaskService,
    private auth: AuthService,
    public dailog: MatDialog
  ) {}

  @Input() searchedValue: string = '';
  @ViewChild(MatSort) matSort!: MatSort;

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
        console.log('User', this.userProfile.username);
        this.dataSource.data = data;
        console.log('Data:', data);
      });
  }

  @ViewChild('paginator') paginator!: MatPaginator;

  // @ViewChildren('components') components!: QueryList<number[]>;
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

  //for searching inside the table data
  searchResults = () => {
    this.dataSource.filter = this.searchedValue.trim().toLowerCase();
  };

  openDialog(): void {
    this.dailog.open(MessageComponent, {
      width: '500px',
      height: '500px',
      panelClass: 'chat-dialog'
    });
  }
}
