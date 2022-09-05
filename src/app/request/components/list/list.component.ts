import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { RequestService } from 'src/app/services/request/request.service';
import { MessagedialogComponent } from 'src/app/shared/components/messagedialog/messagedialog.component';
import { AuthService } from 'src/app/user/auth.service';
import { Request } from 'src/app/models/request';
import { TaskVO } from 'src/app/models/taskVO';
import { TaskService } from 'src/app/services/task/task.service';

export interface TableData {
  id: number;
  description: string;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges, AfterViewInit {
  name = 'Project';
  headers: string[] = [];
  showLoader: boolean = false;
  tableFields: any;

  // displayedColumns: string[] = [
  //   'requestId',
  //   'taskDescription',
  //   'productionCompanyName',
  //   'contractNo',
  //   'projectName',
  //   'talentName',
  //   'priority',
  //   'auditStartDate',
  //   'auditEndDate',
  //   'requestRaised',
  //   'requestClosed',
  //   'quickActions'
  // ];

  // taskDisplayedColumns: string[] = [
  //   'requestId',
  //   'taskDescription',
  //   'productionCompanyName',
  //   'contractNo',
  //   'projectName',
  //   'talentName',
  //   'priority',
  //   'auditStartDate',
  //   'auditEndDate',
  //   'requestRaised',
  //   'requestClosed',
  //   'quickActions'
  // ];

  constructor(
    private _requestService: RequestService,
    private _keycloakService: KeycloakService,
    private auth: AuthService,
    public dailog: MatDialog,
    public loaderService: LoaderService,
    private _taskService: TaskService
  ) {}
  dataSource = new MatTableDataSource<any>();

  @Input() selectedTalentValue: string = '';
  @Input() selectedPriorityValue: string = '';
  @Input() searchedValue: string = '';
  @Input() selectedStatusValue: string = '';
  @Input() selectedProductionValue: string = '';
  requests: Request[] = [];
  tasks: TaskVO[] = [];
  isLoggedIn = true;
  role: string = '';
  public loggedIn: boolean = false;
  public userProfile: KeycloakProfile = {};
  firstName: string | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    this.searchResults();
    this.filterRequests();
  }

  async ngOnInit(): Promise<void> {
    this.showLoader = true;
    this.userProfile = await this.auth.loadUserProfile();
    this.loaderService.startLoader();
    this.role = this.getTheNames();
    if (this.role === 'manager') {
      this.dataSource.data = this.requests;
      this._requestService
        .getAllRequests(this.userProfile.username)
        .subscribe((data: Request[]) => {
          this.loaderService.stopLoader();
          this.dataSource.data = data;
          this.tableFields = this.getTheColums();
          this.requests = data;
        });
    } else if (this.role === 'report_owner') {
      this._taskService
        .getTasksForLoggedInUser(this.userProfile.username)
        .subscribe((data: TaskVO[]) => {
          this.loaderService.stopLoader();
          this.tableFields = this.getTheColums();
          console.log('User', this.userProfile.username);
          this.dataSource.data = data;
          this.tasks = data;
          console.log('Data:', data);
        });
    }
  }

  @ViewChild('paginator') paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    const dialogRef = this.dailog.open(MessagedialogComponent, {
      width: '500px',
      height: '500px',
      panelClass: 'chat-dialog',
      data: { taskId: 1 }
    });
  }

  searchResults = () => {
    if (this.role === 'manager') {
      this.dataSource.filter = this.searchedValue.trim().toLowerCase();
    } else if (this.role === 'report_owner') {
      this.dataSource.filter = this.searchedValue.trim().toLowerCase();
    }
  };

  // filterTalent = () => {
  //   console.log(this.selectedTalentValue);
  //   this.dataSource.filter = JSON.stringify(
  //     this.selectedTalentValue.trim().toLowerCase()
  //   );
  // };

  // filterPriority = () => {
  //   this.dataSource.filter = this.selectedPriorityValue.trim().toLowerCase();
  // };

  // filterProduction = () => {
  //   this.dataSource.filter = this.selectedProductionValue.trim().toLowerCase();
  // };

  // filterStatus = () => {
  //   this.dataSource.filter = this.selectedStatusValue.trim().toLowerCase();
  // };

  // (this.requests);
  // taskDataSource = new MatTableDataSource<TaskVO>(this.tasks);

  filterRequests() {
    if (this.role === 'manager') {
      const filteredRequests = this.requests.filter(this.filteringValues);
      this.dataSource.data = filteredRequests;
    } else if (this.role === 'report_owner') {
      const filteredRequests = this.tasks.filter(this.filteringValues);
      this.dataSource.data = filteredRequests;
    }
  }

  filteringValues = (request: any) => {
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
      talentCondition = request.talentName === this.selectedTalentValue.trim();
    }
    if (this.selectedProductionValue) {
      productionCondition =
        request.productionCompanyName === this.selectedProductionValue.trim();
    }

    if (this.selectedPriorityValue) {
      priorityCondition =
        request.priority === this.selectedPriorityValue.trim().toUpperCase();
    }
    if (this.selectedStatusValue) {
      statusCondition =
        request.taskDescription === this.selectedStatusValue.trim();
    }
    totalCondition =
      talentCondition &&
      productionCondition &&
      priorityCondition &&
      statusCondition;

    return totalCondition;
  };

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

  getTheColums(): any {
    if (this.role === 'manager') {
      this.headers = [
        'requestId',
        'productionCompanyName',
        'contractNo',
        'projectName',
        'talentName',
        'union',
        'priority',
        'requestCreated',
        'expectedClosure',
        'status',
        'actions'
      ];
      return [
        'Request#',
        'Production',
        'Production#',
        'Project Name',
        'Talent Name',
        'Union',
        'Priority',
        'Request Raised',
        'Request Raised',
        'Status',
        'Actions'
      ];
    } else if (this.role === 'report_owner') {
      this.headers = [
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
      return [
        'Request#',
        'Task Description',
        'Production',
        'Production',
        'Project',
        'Talent Name',
        'Priority',
        'Audit Start Date',
        'Audit End Date',
        'Request Raised',
        'Closed',
        'Quick Actions'
      ];
    }
  }
}
