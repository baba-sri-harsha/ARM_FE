import { Injectable } from '@angular/core';
import { DropdownOption } from '../components/dropdown/dropdown.component';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }

  getDropdownOptions<T extends Record<string, any>>(data:T[], valueKey:string, viewValueKey:string): DropdownOption[]{
    return data.map((item:T) => ({
      value: item[valueKey],
      viewValue: item[viewValueKey]
    }));
  };
}
