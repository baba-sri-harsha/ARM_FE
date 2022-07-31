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
import { TaskVO } from 'src/app/models/taskVO';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnChanges, AfterViewInit {
  public userProfile: KeycloakProfile = {};
  tasks: TaskVO[] = [];
  showLoader: boolean = false;
  // dataSource = new MatTableDataSource<Task>();

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
  @Input() selectedTalentValue: string = '';
  @Input() selectedPriorityValue: string = '';
  @Input() selectedStatusValue: string = '';
  @Input() selectedProductionValue: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.searchResults();
    this.filterRequests();
  }

  async ngOnInit(): Promise<void> {
    this.showLoader = true;
    // this.dataSource.filter = this.searchedValue;
    this.dataSource.data = this.tasks;

    this.userProfile = await this.auth.loadUserProfile();
    this._taskService
      .getTasksForLoggedInUser(this.userProfile.username)
      .subscribe((data: TaskVO[]) => {
        console.log('User', this.userProfile.username);
        this.dataSource.data = data;
        this.tasks = data;
        console.log('Data:', data);
      });
  }

  @ViewChild('paginator') paginator!: MatPaginator;

  // @ViewChildren('components') components!: QueryList<number[]>;
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.tasks);
    this.dataSource.paginator = this.paginator;
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

  dataSource = new MatTableDataSource<TaskVO>(this.tasks);

  filterRequests() {
    const filteredRequests = this.tasks.filter((task) => {
      let totalCondition = true;
      let talentCondition = true;
      let priorityCondition = true;
      let productionCondition = true;
      let statusCondition = true;
      if (
        !this.selectedTalentValue &&
        !this.selectedProductionValue &&
        !this.selectedPriorityValue &&
        !this.selectedStatusValue
      ) {
        return true;
      }

      if (this.selectedTalentValue) {
        talentCondition = task.talentName === this.selectedTalentValue.trim();
      }
      if (this.selectedProductionValue) {
        productionCondition =
          task.productionCompanyName === this.selectedProductionValue.trim();
      }

      if (this.selectedPriorityValue) {
        priorityCondition =
          task.priority === this.selectedPriorityValue.trim().toUpperCase();
      }
      if (this.selectedStatusValue) {
        statusCondition =
          task.taskDescription === this.selectedStatusValue.trim();
      }
      totalCondition =
        talentCondition &&
        productionCondition &&
        priorityCondition &&
        statusCondition;

      return totalCondition;
    });
    this.dataSource.data = filteredRequests;
  }
}
