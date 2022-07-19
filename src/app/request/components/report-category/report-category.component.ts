import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export interface PeriodicElement {
  category: string;
  reportOwner: string;
}

// const today = new Date();
// const month = today.getMonth();
// const year = today.getFullYear();

const ELEMENT_DATA: PeriodicElement[] = [
  { category: 'Hydrogen', reportOwner: 'H' },
  { category: 'Helium', reportOwner: 'He' },
  { category: 'Lithium', reportOwner: 'Li' },
  { category: 'Beryllium', reportOwner: 'Be' },
  { category: 'Boron', reportOwner: 'B' },
  { category: 'Carbon', reportOwner: 'C' },
  { category: 'Nitrogen', reportOwner: 'N' },
  { category: 'Oxygen', reportOwner: 'O' },
  { category: 'Fluorine', reportOwner: 'F' },
  { category: 'Neon', reportOwner: 'Ne' }
];
@Component({
  selector: 'app-report-category',
  templateUrl: './report-category.component.html',
  styleUrls: ['./report-category.component.scss']
})
export class ReportCategoryComponent implements OnInit {
  constructor() {}
  displayedColumns: string[] = [
    'category',
    'auditPeriod',
    'reportOwner',
    'actions'
  ];
  data = ELEMENT_DATA;
  model!: string;
  auditPeriod = new FormGroup({
    start: new FormControl(null, Validators.required),
    end: new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
    console.log(`Inside ReportCategory`);
  }
}
