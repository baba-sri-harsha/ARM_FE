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
import { map, startWith, switchMap, filter } from 'rxjs/operators';
import { TooltipPosition } from '@angular/material/tooltip';
export interface DropdownOption {
  value: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input()
  label: string = 'Pick one';
  // @Output() childData: EventEmitter<string> = new EventEmitter();

  @Input() options: DropdownOption[] = [];
  @Input() data: string = '';
  @Input() reqDetails:Boolean=  false;
  myControl = new FormControl('');
  position: TooltipPosition[] = ['above'];
  constructor() {}

  filteredOptions!: Observable<DropdownOption[]>;
  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: string | null) => this._filter(value || ''))
    );
  }

  private _filter(value: string | null): DropdownOption[] {
    if (!value) {
      return [...this.options];
    }
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.value.toLowerCase().includes(filterValue)
    );
  }
}
