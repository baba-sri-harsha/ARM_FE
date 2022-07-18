import { Component, OnInit } from '@angular/core';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { DropdownOption } from 'src/app/shared/components/dropdown/dropdown.component';
import { TalentNames } from 'src/app/models/talentnames';
import { ProductionNames } from 'src/app/models/productionnames';
import { TalentService } from 'src/app/services/talent/talent.service';
import { ProductionService } from 'src/app/services/production/production.service';
enum Priority {
  HIGH = 'High',
  LOW = 'Low',
  MEDIUM = 'Medium'
}
type Priorities = {
  name: Priority;
};
enum Status {
  PI = 'Pending Internal',
  PT = 'Pending Talent',
  SP = 'Settlement Processing',
  C = 'Completed'
}
type Statuses = {
  name: Status;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  talentDropdownOptions: DropdownOption[] = [];
  productionDropdownOptions: DropdownOption[] = [];
  priorityDropDownOptions: DropdownOption[] = [];
  statusDropDownOptions: DropdownOption[] = [];

  priorities: Priorities[] = [
    { name: Priority.HIGH },
    { name: Priority.MEDIUM },
    { name: Priority.LOW }
  ];
  statuses: Statuses[] = [
    { name: Status.PI },
    { name: Status.PT },
    { name: Status.SP },
    { name: Status.C }
  ];
  somedata = '';
  constructor(
    private _dropdownService: DropdownService,
    private _talentService: TalentService,
    private _productionService: ProductionService
  ) {}

  ngOnInit(): void {
    this._talentService.getAllTalents().subscribe((data: TalentNames[]) => {
      this.talentDropdownOptions =
        this._dropdownService.getDropdownOptions<TalentNames>(
          data,
          'talentName',
          'talentName'
        );
      console.log(this.talentDropdownOptions);
    });

    this._productionService
      .getAllProductions()
      .subscribe((data: ProductionNames[]) => {
        this.productionDropdownOptions =
          this._dropdownService.getDropdownOptions<ProductionNames>(
            data,
            'productionCompanyName',
            'productionCompanyName'
          );
        console.log(data);
        console.log(this.productionDropdownOptions);
      });

    this.priorityDropDownOptions =
      this._dropdownService.getDropdownOptions<Priorities>(
        this.priorities,
        'name',
        'name'
      );
    this.statusDropDownOptions =
      this._dropdownService.getDropdownOptions<Statuses>(
        this.statuses,
        'name',
        'name'
      );
  }

  searchText: string = '';

  onSearchTextEntered = (searchValue: string) => {
    this.searchText = searchValue;
  };
}
