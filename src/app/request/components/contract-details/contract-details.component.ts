import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { ProductionNames } from 'src/app/models/productionnames';
import { Project } from 'src/app/models/project';
import { TalentNames } from 'src/app/models/talentnames';
import { ProductionService } from 'src/app/services/production/production.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { TalentService } from 'src/app/services/talent/talent.service';
import { DropdownOption } from 'src/app/shared/components/dropdown/dropdown.component';
import { DropdownService } from 'src/app/shared/services/dropdown.service';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {
  productionDropdownOptions: DropdownOption[] = [];
  projectDropdownOptions: DropdownOption[] = [];
  talentDropdownOptions: DropdownOption[] = [];
  constructor(
    private _productionService: ProductionService,
    private _talentService: TalentService,
    private _projectService: ProjectService,
    private _dropdownService: DropdownService
  ) {}
  myControl = new FormControl('');
  myControl2 = new FormControl('');
  myControl3 = new FormControl('');

  ngOnInit(): void {
    console.log(`Inside ContractDetails`);
    this._productionService
      .getAllProductions()
      .subscribe((data: ProductionNames[]) => {
        this.productionDropdownOptions =
          this._dropdownService.getDropdownOptions<ProductionNames>(
            data,
            'productionCompanyName',
            'productionCompanyName'
          );
        console.log('data', data);
        console.log('DropdownOptions', this.productionDropdownOptions);
      });

    this._talentService.getAllTalents().subscribe((data: TalentNames[]) => {
      this.talentDropdownOptions =
        this._dropdownService.getDropdownOptions<TalentNames>(
          data,
          'talentName',
          'talentName'
        );
      console.log('Talent', this.talentDropdownOptions);
    });

    this._projectService.getAllProjects().subscribe((data: Project[]) => {
      this.projectDropdownOptions =
        this._dropdownService.getDropdownOptions<Project>(
          data,
          'projectName',
          'projectName'
        );
      console.log('Project:', this.projectDropdownOptions);
    });
  }
}
