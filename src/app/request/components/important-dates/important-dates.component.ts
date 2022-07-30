import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RequestView } from 'src/app/models/requestView';
export interface ImportDate {
  option: string;
  date?: Date | null;
  ctrl?: FormControl;
}

@Component({
  selector: 'app-important-dates',
  templateUrl: './important-dates.component.html',
  styleUrls: ['./important-dates.component.scss']
})
export class ImportantDatesComponent implements OnInit {
  ELEMENT_DATA: ImportDate[] = [
    { option: 'Request Created', ctrl: new FormControl(new Date()) },
    { option: 'Expected Closure', ctrl: new FormControl() },
    { option: 'Audit Start Date', ctrl: new FormControl() },
    { option: 'Audit End Date', ctrl: new FormControl() },
    { option: 'Report Submission', ctrl: new FormControl() },
    { option: 'Settlement Date', ctrl: new FormControl() },
    { option: 'Receipt Date', ctrl: new FormControl() }
  ];
  editDates: ImportDate[] = [];
  viewDates: ImportDate[] = [];
  @Input() reqDetails: boolean = false;
  @Output() dateChanged: EventEmitter<ImportDate[]> = new EventEmitter();
  @Input() requestView: boolean = false;

  @Input() req: RequestView = {
    requestId: 0,
    productionName: '',
    productionNumber: '',
    contractNo: '',
    projectName: '',
    contractDate: new Date(),
    talentName: '',
    unionName: '',
    priority: '',
    requestSchedule: {
      requestCreated: new Date(),
      expectedClosure: new Date(),
      auditEndDate: new Date(),
      auditStartDate: new Date(),
      reportSubmission: new Date(),
      settlementDate: new Date(),
      receiptDate: new Date()
    },
    status: '',
    tasksList: new Set()
  };
  constructor() {}

  ngOnInit(): void {
    console.log(`Inside ImportantDates`);
  }

  onDateChange() {
    const dates = this.ELEMENT_DATA.map<ImportDate>((data: ImportDate) => {
      return {
        option: data.option,
        date: data.ctrl?.value
      };
    });

    console.log(dates);
    this.dateChanged.emit(dates);
  }

  setDates = () => {
    this.editDates = [
      {
        option: 'Request Created',
        ctrl: new FormControl(new Date(this.req.requestSchedule.requestCreated))
      },
      {
        option: 'Expected Closure',
        ctrl: new FormControl(
          new Date(this.req.requestSchedule.expectedClosure)
        )
      },
      {
        option: 'Audit Start Date',
        ctrl: new FormControl(new Date(this.req.requestSchedule.auditStartDate))
      },
      {
        option: 'Audit End Date',
        ctrl: new FormControl(new Date(this.req.requestSchedule.auditEndDate))
      },
      { option: 'Report Submission', ctrl: new FormControl() },
      { option: 'Settlement Date', ctrl: new FormControl() },
      { option: 'Receipt Date', ctrl: new FormControl() }
    ];
    this.viewDates = [
      {
        option: 'Request Created',
        ctrl: new FormControl(new Date(this.req.requestSchedule.requestCreated))
      },
      {
        option: 'Expected Closure',
        ctrl: new FormControl(
          new Date(this.req.requestSchedule.expectedClosure)
        )
      },
      {
        option: 'Audit Start Date',
        ctrl: new FormControl(new Date(this.req.requestSchedule.auditStartDate))
      },
      {
        option: 'Audit End Date',
        ctrl: new FormControl(new Date(this.req.requestSchedule.auditEndDate))
      },
      {
        option: 'Report Submission',
        ctrl: new FormControl(
          new Date(this.req.requestSchedule.reportSubmission)
        )
      },
      {
        option: 'Settlement Date',
        ctrl: new FormControl(new Date(this.req.requestSchedule.settlementDate))
      },
      {
        option: 'Receipt Date',
        ctrl: new FormControl(new Date(this.req.requestSchedule.receiptDate))
      }
    ];
  };

  displayedColumns: string[] = ['option', 'ctrl'];
  dataSource = this.ELEMENT_DATA;
  date = new FormControl(new Date(11, 22, 4));

  setDataSource(): ImportDate[] {
    if (this.reqDetails) {
      return this.editDates;
    }
    else if(this.requestView){
      return this.viewDates
    }
    return this.ELEMENT_DATA;
  }
}
