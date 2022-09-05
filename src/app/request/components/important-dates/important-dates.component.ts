import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RequestView } from 'src/app/models/requestView';
/**
 * @author - MadhusreeMangi
 */
export interface ImportantDate {
  option: string;
  name:string;
  date?: Date | null;
  ctrl?: FormControl;
}

@Component({
  selector: 'app-important-dates',
  templateUrl: './important-dates.component.html',
  styleUrls: ['./important-dates.component.scss']
})
export class ImportantDatesComponent implements OnInit {
  ELEMENT_DATA: ImportantDate[] = [
    { option: 'Request Created', name: 'requestCreated',  ctrl: new FormControl(new Date()) },
    { option: 'Expected Closure', name: 'expectedClosure',  ctrl: new FormControl() },
    { option: 'Audit Start Date', name: 'auditStartDate',  ctrl: new FormControl() },
    { option: 'Audit End Date', name: 'auditEndDate',  ctrl: new FormControl() },
    { option: 'Report Submission', name: 'reportSubmissionDate',  ctrl: new FormControl() },
    { option: 'Settlement Date', name: 'settlementDate',  ctrl: new FormControl() },
    { option: 'Receipt Date', name: 'receiptDate', ctrl: new FormControl() }
  ];
  editDates: ImportantDate[] = [];
  viewDates: ImportantDate[] = [];
  @Input() reqDetails: boolean = false;
  @Output() dateChanged: EventEmitter<ImportantDate[]> = new EventEmitter();
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

  /**
   * to get the date entered
   * @author - Sipoy Sikindar
   */
  onDateChange() {
    const dates = this.ELEMENT_DATA.map<ImportantDate>((data: ImportantDate) => {
      return {
        option: data.option,
        name: data.name,
        date: data.ctrl?.value
      };
    });

    console.log(dates);
    this.dateChanged.emit(dates);
  }
  /**
   * to set the dates
   * @author - Baba Sri Harsha
   */
  setDates = () => {
    this.viewDates = [
      {
        option: 'Request Created',
        name: 'requestCreated',
        ctrl: new FormControl(new Date(this.req.requestSchedule.requestCreated))
      },
      {
        option: 'Expected Closure',
        name: 'expectedClosure',
        ctrl: new FormControl(
          new Date(this.req.requestSchedule.expectedClosure)
        )
      },
      {
        option: 'Audit Start Date',
        name: 'auditStartDate',
        ctrl: new FormControl(new Date(this.req.requestSchedule.auditStartDate))
      },
      {
        option: 'Audit End Date',
        name: 'auditEndDate',
        ctrl: new FormControl(new Date(this.req.requestSchedule.auditEndDate))
      },
      {
        option: 'Report Submission',
        name: 'reportSubmissionDate',
        ctrl: new FormControl(
          new Date(this.req.requestSchedule.reportSubmission)
        )
      },
      {
        option: 'Settlement Date',
        name: 'settlementDate',
        ctrl: new FormControl(new Date(this.req.requestSchedule.settlementDate))
      },
      {
        option: 'Receipt Date',
        name: 'receiptDate',
        ctrl: new FormControl(new Date(this.req.requestSchedule.receiptDate))
      }
    ];
  };

  displayedColumns: string[] = ['option', 'ctrl'];
  dataSource = this.ELEMENT_DATA;

  /**
   * to set or view the dates
   * @author - MadhusreeMangi
   * @returns dates
   */
  setDataSource(): ImportantDate[] {
    if (this.reqDetails) {
      return this.viewDates;
    }
    return this.ELEMENT_DATA;
  }
}
