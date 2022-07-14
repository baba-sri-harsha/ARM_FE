import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
export interface DropdownOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input()
  label: string = 'Pick one';
  @Output() childData: EventEmitter<string> = new EventEmitter();
  addValue(data: string) {
    this.childData.emit(data);
  }
  @Input() parentData: DropdownOption[] = [];
  myControl = new FormControl('');
  constructor() {}
  ngOnInit(): void {
    console.log('Inside Dropdown OnInit');
  }
}
