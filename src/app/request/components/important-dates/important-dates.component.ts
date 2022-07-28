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
  @Input() reqDetails: Boolean = false;
  @Output() dateChanged: EventEmitter<ImportDate[]> = new EventEmitter();

  @Input() req: RequestView = {
    requestId: 0,
    productionCompanyName: '',
    productionNumber: '',
    contractNo: '',
    projectName: '',
    contractDate: new Date(),
    talentName: '',
    unionName: '',
    priority: '',
    requestSchedule: {
      requestCreated: new Date(),
      expectedClosure: new Date()
    },
    status: '',
    tasksList: new Set()
  };
  dates: Date[] = [
    new Date(this.req.requestSchedule.requestCreated),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date()
  ];
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

  displayedColumns: string[] = ['option', 'ctrl'];
  dataSource = this.ELEMENT_DATA;
  date = new FormControl(new Date(11, 22, 4));
}
