import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RequestView } from 'src/app/models/requestView';
export interface PeriodicElement {
  option: string;
  date?: string;
}

@Component({
  selector: 'app-important-dates',
  templateUrl: './important-dates.component.html',
  styleUrls: ['./important-dates.component.scss']
})
export class ImportantDatesComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [
    { option: 'Request Created' },
    { option: 'Expected Closure' },
    { option: 'Audit Start Date' },
    { option: 'Audit End Date' },
    { option: 'Report Submission' },
    { option: 'Settlement Date' },
    { option: 'Receipt Date' }
  ];
  @Input() reqDetails: Boolean = false;
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
  // date1= new FormControl(new Date("22-12-2"));
  constructor() {}

  ngOnInit(): void {
    console.log(`Inside ImportantDates`);
  }

  displayedColumns: string[] = ['option', 'date'];
  dataSource = this.ELEMENT_DATA;
  // setDate=(date:Date):Date=>{
  date = new FormControl(new Date(11, 22, 4));
  // return date1.value;
  // }
}
