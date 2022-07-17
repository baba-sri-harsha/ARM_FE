import { Component, OnInit } from '@angular/core';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { DropdownOption } from 'src/app/shared/components/dropdown/dropdown.component';
import { TalentService } from '../../talent.service';
import { TalentNames } from 'src/app/models/talentnames';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  talentDropdownOptions: DropdownOption[] = [];
  somedata = '';
  constructor(
    private _dropdownService: DropdownService,
    private _talentService: TalentService
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
  }

  searchText: string = '';

  onSearchTextEntered = (searchValue: string) => {
    this.searchText = searchValue;
  };
}
