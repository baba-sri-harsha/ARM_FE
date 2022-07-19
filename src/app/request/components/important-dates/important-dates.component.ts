import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-important-dates',
  templateUrl: './important-dates.component.html',
  styleUrls: ['./important-dates.component.scss']
})
export class ImportantDatesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log(`Inside ImportantDates`);
  }
  displayedColumns: string[] = ['item', 'cost'];
  transactions: any[] = [
    { item: 'Beach ball', cost: 4 },
    { item: 'Towel', cost: 5 }
  ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions
      .map((t) => t.cost)
      .reduce((acc, value) => acc + value, 0);
  }
}
