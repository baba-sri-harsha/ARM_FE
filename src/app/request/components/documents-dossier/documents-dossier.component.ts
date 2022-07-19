import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents-dossier',
  templateUrl: './documents-dossier.component.html',
  styleUrls: ['./documents-dossier.component.scss']
})
export class DocumentsDossierComponent implements OnInit {
  displayedColumns: string[] = ['item', 'cost'];
  transactions: any[] = [
    { item: 'Beach ball', cost: 4 },
    { item: 'Towel', cost: 5 }
  ];

  constructor() {}

  ngOnInit(): void {
    console.log(`Inside DocumentDossier`);
  }
  getTotalCost() {
    return this.transactions
      .map((t) => t.cost)
      .reduce((acc, value) => acc + value, 0);
  }
}
