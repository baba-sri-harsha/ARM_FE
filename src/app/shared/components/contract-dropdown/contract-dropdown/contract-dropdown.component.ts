import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { map, startWith, switchMap, filter } from 'rxjs/operators';
import { DropdownOption } from '../../dropdown/dropdown.component';
/**
 * @author - Madhu Shree
 */
@Component({
  selector: 'app-contract-dropdown',
  templateUrl: './contract-dropdown.component.html',
  styleUrls: ['./contract-dropdown.component.scss']
})
export class ContractDropdownComponent implements OnInit, OnChanges {
  myControl = new FormControl('');
  filteredOptions!: Observable<DropdownOption[]>;

  @Input() options: DropdownOption[] = [];
  @Input() label: string = '';
  position: TooltipPosition[] = ['above'];
  @Input() data: string = '';
  @Input() reqDetails: boolean = false;
  @Input() requestView: boolean = false;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: string | null) => this._filter(value || ''))
    );
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: string | null) => this._filter(value || ''))
    );
  }
  private _filter(value: string): DropdownOption[] {
    if (!value) {
      return [...this.options];
    }
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.value.toLowerCase().includes(filterValue)
    );
  }
  @Output() id = new EventEmitter<any>();

  getOption(event: any) {
    this.id.emit(event);
    // console.log(`Id: ${event}`);
  }
}
