import { Component, OnInit } from '@angular/core';
/**
 * @author - Sandeep Pinasimham
 */
interface DropDownData {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-box-container',
  templateUrl: './box-container.component.html',
  styleUrls: ['./box-container.component.scss']
})
export class BoxContainerComponent implements OnInit {
  foods: DropDownData[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  constructor() {}

  ngOnInit(): void {
    console.log('inside box-container');
  }
}
