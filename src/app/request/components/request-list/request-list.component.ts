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

type Request = {
  requestId: number;
  production: string;
  productionId: number;
  projectName: string;
  talentName: string;
  union: string;
  priority: string;
  requestRaised: string;
  expectedClosure: string;
  status: string;
};
@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit, OnChanges, AfterViewInit {
  //dummy data

  headers = [
    'requestId',
    'production',
    'productionId',
    'projectName',
    'talentName',
    'union',
    'priority',
    'requestRaised',
    'expectedClosure',
    'status',
    'actions'
  ];

  requests: Request[] = [
    {
      requestId: 1,
      production: 'Marvel',
      productionId: 100,
      projectName: 'Iron man',
      talentName: 'robert',
      union: 'DAG',
      priority: 'LOW',
      requestRaised: '2022-03-02',
      expectedClosure: '2022-03-02',
      status: 'Pending Internal'
    },
    {
      requestId: 251315,
      production: 'Marvel',
      productionId: 100,
      projectName: 'Iron man',
      talentName: 'robert',
      union: 'DAG',
      priority: 'LOW',
      requestRaised: '2022-03-02',
      expectedClosure: '2022-03-02',
      status: 'Pending Internal'
    },
    {
      requestId: 251315,
      production: 'Marvel',
      productionId: 100,
      projectName: 'Iron man',
      talentName: 'robert',
      union: 'DAG',
      priority: 'LOW',
      requestRaised: '2022-03-02',
      expectedClosure: '2022-03-02',
      status: 'Pending Internal'
    },
    {
      requestId: 251315,
      production: 'Marvel',
      productionId: 100,
      projectName: 'Iron man',
      talentName: 'robert',
      union: 'DAG',
      priority: 'LOW',
      requestRaised: '2022-03-02',
      expectedClosure: '2022-03-02',
      status: 'Pending Internal'
    },
    {
      requestId: 251315,
      production: 'Marvel',
      productionId: 100,
      projectName: 'Iron man',
      talentName: 'robert',
      union: 'DAG',
      priority: 'LOW',
      requestRaised: '2022-03-02',
      expectedClosure: '2022-03-02',
      status: 'Pending Internal'
    },
    {
      requestId: 251315,
      production: 'Marvel',
      productionId: 100,
      projectName: 'Iron man',
      talentName: 'robert',
      union: 'DAG',
      priority: 'LOW',
      requestRaised: '2022-03-02',
      expectedClosure: '2022-03-02',
      status: 'Pending Internal'
    },
    {
      requestId: 251315,
      production: 'Marvel',
      productionId: 100,
      projectName: 'Iron man',
      talentName: 'robert',
      union: 'DAG',
      priority: 'LOW',
      requestRaised: '2022-03-02',
      expectedClosure: '2022-03-02',
      status: 'Pending Internal'
    },
    {
      requestId: 251315,
      production: 'Marvel',
      productionId: 100,
      projectName: 'Iron man',
      talentName: 'robert',
      union: 'DAG',
      priority: 'LOW',
      requestRaised: '2022-03-02',
      expectedClosure: '2022-03-02',
      status: 'Pending Internal'
    },
    {
      requestId: 2,
      production: 'Marvel',
      productionId: 100,
      projectName: 'Iron man',
      talentName: 'robert',
      union: 'DAG',
      priority: 'LOW',
      requestRaised: '2022-03-02',
      expectedClosure: '2022-03-02',
      status: 'Pending Internal'
    },
    {
      requestId: 2,
      production: 'Marvel',
      productionId: 100,
      projectName: 'Iron man',
      talentName: 'robert',
      union: 'DAG',
      priority: 'LOW',
      requestRaised: '2022-03-02',
      expectedClosure: '2022-03-02',
      status: 'Pending Internal'
    },
    {
      requestId: 2,
      production: 'Marvel',
      productionId: 100,
      projectName: 'Iron man',
      talentName: 'robert',
      union: 'DAG',
      priority: 'LOW',
      requestRaised: '2022-03-02',
      expectedClosure: '2022-03-02',
      status: 'Pending Internal'
    }
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
  constructor() {}

  @Input() searchedValue: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.searchResults();
  }

  ngOnInit(): void {
    this.showLoader = true;
    this.dataSource.filter = this.searchedValue;
    this.dataSource.data = this.requests;

    // this._taskService.getTasks().subscribe((data: Request[]) => {
    //   this.requests = data;
    //   this.dataSource.data = data;
    //   this.dataSource.data = this.tasks;
    //   this.showLoader = false;
    // });

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
