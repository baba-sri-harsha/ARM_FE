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
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { RequestService } from 'src/app/services/request/request.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit, OnChanges, AfterViewInit {
  headers = [
    'requestId',
    'productionCompanyName',
    'productionNumber',
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
    private auth: AuthService
  ) {}

  @Input() searchedValue: string = '';
  requests: Request[] = [];
  isLoggedIn = true;
  public loggedIn: boolean = false;
  public userProfile: KeycloakProfile = {};
  firstName: string | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    this.searchResults();
  }

  async ngOnInit(): Promise<void> {
    this.showLoader = true;
    this.dataSource.filter = this.searchedValue;
    this.dataSource.data = this.requests;

    this.userProfile = await this.auth.loadUserProfile();

    this._requestService
      .getAllRequests(this.userProfile.username)
      .subscribe((data: Request[]) => {
        this.dataSource.data = data;

        console.log(`Inside Request List Component`);
        console.log(data);
      });
    console.log(this.dataSource);
  }

  dataSource = new MatTableDataSource<Request>(this.requests);

  @ViewChild('paginator') paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.requests);
    this.dataSource.paginator = this.paginator;
  }

  searchResults = () => {
    this.dataSource.filter = this.searchedValue.trim().toLowerCase();
  };
}
