import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReqId } from 'src/app/models/req-id';
import { RequestView } from 'src/app/models/requestView';
import { RequestService } from 'src/app/services/request/request.service';
import { ReqIdService } from 'src/app/services/requestId/req-id.service';
import { DropdownOption } from 'src/app/shared/components/dropdown/dropdown.component';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
enum Priority {
  HIGH = 'High',
  LOW = 'Low',
  MEDIUM = 'Medium'
}
type Priorities = {
  name: Priority;
};
enum Status {
  PI = 'Pending Internal',
  PT = 'Pending Talent',
  SP = 'Settlement Processing',
  C = 'Completed'
}
type Statuses = {
  name: Status;
};

enum Union {
  DAG = 'DAG',
  WAG = 'WAG',
  SAG = 'SAG-AFTRA',
  INDEPENDENT = 'NA'
}
type Unions = {
  name: Union;
};
@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {
  myDate = new Date();
  constructor(
    private _dropdownService: DropdownService,
    private _reqIdService: ReqIdService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _requestService: RequestService
  ) {}
  priorityDropDownOptions: DropdownOption[] = [];
  statusDropDownOptions: DropdownOption[] = [];
  unionsDropDownOptions: DropdownOption[] = [];
  reqId: ReqId = { id: 0 };
  priorities: Priorities[] = [
    { name: Priority.HIGH },
    { name: Priority.MEDIUM },
    { name: Priority.LOW }
  ];
  statuses: Statuses[] = [
    { name: Status.PI },
    { name: Status.PT },
    { name: Status.SP },
    { name: Status.C }
  ];
  unions: Unions[] = [
    { name: Union.DAG },
    { name: Union.SAG },
    { name: Union.INDEPENDENT },
    { name: Union.WAG }
  ];
  url: string = '';
  req: RequestView = {
    requestId: 0,
    productionCompanyName: '',
    productionNumber: '',
    contractNo: '',
    projectName: '',
    talentName: '',
    unionName: '',
    contractDate: new Date(),
    priority: '',
    requestSchedule: {
      requestCreated: new Date(),
      expectedClosure: new Date()
    },
    status: '',
    tasksList: new Set()
  };

  reqDetails: Boolean = false;
  ngOnInit(): void {
    console.log('inside CreateRequestComponent ngOnInit');
    console.log(this._router.url);
    this.url = this._router.url;

    //----------Request Details-----------------

    if (this.url.includes('/request-details')) {
      this.reqDetails = true;
      this._activatedRoute.paramMap.subscribe((map) => {
        let i = map.get('requestId');
        if (i) this.reqId.id = parseInt(i);
      });
      this._requestService.getRequestById(this.reqId.id).subscribe({
        next: (data) => {
          console.log(data);
          this.req = data;
        }
      });
    }

    //-------------Create New------------------
    else {
      this._reqIdService.getRequestId().subscribe({
        next: (data) => {
          this.reqId = data;
          console.log(data);
        }
      });
      this.priorityDropDownOptions =
        this._dropdownService.getDropdownOptions<Priorities>(
          this.priorities,
          'name',
          'name'
        );
      this.statusDropDownOptions =
        this._dropdownService.getDropdownOptions<Statuses>(
          this.statuses,
          'name',
          'name'
        );
      this.unionsDropDownOptions =
        this._dropdownService.getDropdownOptions<Unions>(
          this.unions,
          'name',
          'name'
        );
      console.log('inside CreateRequestComponent ngOnInit');
      console.log(this._router.url);
      this.url = this._router.url;

      //----------Request Details-----------------

      if (this.url.includes('/request-details')) {
        this._activatedRoute.paramMap.subscribe((map) => {
          let i = map.get('requestId');
          if (i) this.reqId.id = parseInt(i);
        });
      }

      //-------------Create New------------------
      else {
        this._reqIdService.getRequestId().subscribe({
          next: (data) => {
            this.reqId = data;
            console.log(data);
          }
        });
      }
    }
  }
  redirectToHome = () => {
    this._router.navigate(['/']);
  };
}
