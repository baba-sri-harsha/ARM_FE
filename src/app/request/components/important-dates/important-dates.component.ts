import { Component, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {
    console.log(`Inside ImportantDates`);
  }

  displayedColumns: string[] = ['option', 'date'];
  dataSource = this.ELEMENT_DATA;
}
