import { MessagedialogComponent } from './../../../shared/components/messagedialog/messagedialog.component';
import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { RequestService } from 'src/app/services/request/request.service';
import { AuthService } from 'src/app/user/auth.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/shared/components/message/message.component';
import { Dialog } from '@angular/cdk/dialog';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit, OnChanges, AfterViewInit {
  headers = [
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

  showLoader: boolean = false;

  displayedColumns: string[] = [
    'requestId',
    'taskDescription',
    'production',
    'productionId',
    'project',
    'talentName',
    'priority',
    'auditPeriod',
    'request',
    'closed',
    'actions'
  ];
  constructor(
    private _requestService: RequestService,
    private keycloakService: KeycloakService,
    private auth: AuthService,
    public dailog: MatDialog
  ) {}

  @Input() selectedTalentValue: string = '';
  @Input() selectedPriorityValue: string = '';
  @Input() searchedValue: string = '';
  @Input() selectedStatusValue: string = '';
  @Input() selectedProductionValue: string = '';
  requests: Request[] = [];
  isLoggedIn = true;
  public loggedIn: boolean = false;
  public userProfile: KeycloakProfile = {};
  firstName: string | undefined;
  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    this.searchResults();
    // this.filterTalent();
    // this.filterPriority();
    // this.filterStatus();
    // this.filterProduction();
    this.filterRequests();
  }

  async ngOnInit(): Promise<void> {
    this.showLoader = true;

    // this.dataSource.filter = this.searchedValue;

    // this.dataSource.filterPredicate = function (record, filter) {
    //   return record.id.indexOf(filter) != -1;
    // };
    // this.dataSource.filter = this.selectedPriorityValue;
    // this.dataSource.filter = this.selectedProductionValue;
    // this.dataSource.filter = this.selectedStatusValue;

    this.dataSource.data = this.requests;

    this.userProfile = await this.auth.loadUserProfile();

    this._requestService
      .getAllRequests(this.userProfile.username)
      .subscribe((data: Request[]) => {
        this.dataSource.data = data;
        this.requests = data;

        console.log(`Inside Request List Component`);
        console.log('Request list', data);
      });

    // this.dataSource.filterPredicate = (record) => {
    //   let totalCondition = false;
    //   let talentCondition = false;
    //   let productionCondition = false;
    //   if (!this.selectedTalentValue && !this.selectedProductionValue) {
    //     return true;
    //   }

    //   if (this.selectedTalentValue) {
    //     talentCondition = record.talentName === this.selectedTalentValue.trim();
    //   }
    //   if (this.selectedProductionValue) {
    //     productionCondition =
    //       record.productionCompanyName === this.selectedProductionValue.trim();
    //   }

    //   totalCondition = talentCondition || productionCondition;

    //   return totalCondition;
    // };
    // console.log(this.dataSource);
  }

  // customFiltered() {
  //   return (data: any, filter: any) => {
  //     if (this.selectedTalentValue && this.selectedPriorityValue)
  //       return (
  //         data.talentName == this.selectedTalentValue &&
  //         data.priority == this.selectedPriorityValue
  //       );
  //     if (this.selectedTalentValue)
  //       return data.talentName == this.selectedTalentValue;
  //     if (this.selectedPriorityValue)
  //       return data.priority == this.selectedPriorityValue;
  //     return true;
  //   };
  // }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.requests);
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
    this.dataSource.filter = this.searchedValue.trim().toLowerCase();
  };

  filterTalent = () => {
    console.log(this.selectedTalentValue);
    // 4.0    this._requestService
    //       .getAllRequests(this.userProfile.username)
    //       .subscribe((data: Request[]) => {
    //         this.dataSource.data = data;

    //         console.log(`Inside Request List Component`);
    //         console.log('Request list', data);
    //       });

    this.dataSource.filter = JSON.stringify(
      this.selectedTalentValue.trim().toLowerCase()
    );
  };

  filterPriority = () => {
    this.dataSource.filter = this.selectedPriorityValue.trim().toLowerCase();
  };

  filterProduction = () => {
    this.dataSource.filter = this.selectedProductionValue.trim().toLowerCase();
  };

  filterStatus = () => {
    this.dataSource.filter = this.selectedStatusValue.trim().toLowerCase();
  };

  dataSource = new MatTableDataSource<Request>(this.requests);

  filterRequests() {
    const filteredRequests = this.requests.filter((request) => {
      let totalCondition = false;
      let talentCondition = false;
      let priorityCondition = false;
      let productionCondition = false;
      let statusCondition = false;
      if (
        !this.selectedTalentValue &&
        !this.selectedProductionValue &&
        !this.selectedPriorityValue &&
        !this.selectedStatusValue
      ) {
        return true;
      }

      if (this.selectedTalentValue) {
        talentCondition =
          request.talentName === this.selectedTalentValue.trim();
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
        statusCondition = request.status === this.selectedStatusValue.trim();
      }
      totalCondition =
        talentCondition ||
        productionCondition ||
        priorityCondition ||
        statusCondition;

      return totalCondition;
    });
    this.dataSource.data = filteredRequests;
  }
}
