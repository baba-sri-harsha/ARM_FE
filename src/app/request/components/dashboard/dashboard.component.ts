import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs';
import { DropDownService } from 'src/app/shared/services/drop-down.service';

export interface DropdownOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dropDownOption: DropdownOption[] = [];
  somedata = '';
  parentData: any;
  constructor(private _dropdownService: DropDownService) {}

  callGetTalentService = (eventData: any | string) => {
    console.log(eventData);
    this.somedata = eventData;
    if (eventData === '') {
      this._dropdownService.getAllTalents().subscribe({
        next: (data) => {
          this.dropDownOption = data.map((talent) => {
            return { value: talent.talentName, viewValue: talent.talentName };
          });
        }
      });
      console.log(`Api call with empty field`);
    } else {
      this._dropdownService.getTalentNames(eventData).subscribe({
        next: (data) => {
          this.dropDownOption = data.map((talent) => {
            return { value: talent.talentName, viewValue: talent.talentName };
          });
        }
      });
      console.log(`Inside getTalentName api call with some Value`);
    }
  };
  ngOnInit(): void {
    console.log('Inside Dropdown OnInit');
  }
}
