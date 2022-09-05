import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
/**
 * @author - Abuthair Sheika
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('inside SearchComponent');
  }

  enteredSearchValue: string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  /**
   * to retieve the text entered in the search box
   */
  onSearchTextChanged = () => {
    this.searchTextChanged.emit(this.enteredSearchValue);
  };
}
