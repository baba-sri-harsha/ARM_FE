import { Injectable } from '@angular/core';
import { DropdownOption } from '../components/dropdown/dropdown.component';
/**
 * @author - Sandeep Pinasimham
 */
@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  constructor() {}

  /**
   * to get the dropdown options
   * @param data 
   * @param valueKey 
   * @param viewValueKey 
   * @returns 
   */
  getDropdownOptions<T extends Record<string, any>>(
    data: T[],
    valueKey: string,
    viewValueKey: string
  ): DropdownOption[] {
    return data.map((item: T) => ({
      value: item[valueKey],
      viewValue: item[viewValueKey]
    }));
  }
}
