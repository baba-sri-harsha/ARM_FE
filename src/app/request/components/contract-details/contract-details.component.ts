import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ProductionNames } from 'src/app/models/productionnames';
import { Project } from 'src/app/models/project';
import { RequestView } from 'src/app/models/requestView';
import { TaskView } from 'src/app/models/task-view';
import { ProductionService } from 'src/app/services/production/production.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { TalentService } from 'src/app/services/talent/talent.service';
import { DropdownOption } from 'src/app/shared/components/dropdown/dropdown.component';
import { DropdownService } from 'src/app/shared/services/dropdown.service';

export interface TalentVOList {
  talentName: string;
  contractNo: string;
}
@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {
  productionDropdownOptions: DropdownOption[] = [];
  projectDropdownOptions: DropdownOption[] = [];
  talentDropdownOptions: DropdownOption[] = [];
  contractNo!: string;
  @Input() request: RequestView = {
    requestId: 0,
    productionCompanyName: '',
    productionNumber: '',
    contractNo: '',
    projectName: '',
    contractDate: new Date(),
    talentName: '',
    unionName: '',
    priority: '',
    requestSchedule: {
      requestCreated: new Date(),
      expectedClosure: new Date()
    },
    status: '',
    tasksList: new Set()
  };

  @Input() url: Boolean = false;
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
            'productionId'
          );
        console.log('Productions', data);
      });
  }

  getProjects = (event: any) => {
    let productionId = parseInt(event.viewValue);
    console.log('pId', productionId);
    this._projectService
      .getProjectsOfTypedProduction(productionId)
      .subscribe((data: Project[]) => {
        this.projectDropdownOptions =
          this._dropdownService.getDropdownOptions<Project>(
            data,
            'projectName',
            'projectName'
          );
        console.log('Project Obj', data);
        console.log('Project:', this.projectDropdownOptions);
      });
  };

  getTalents = (event: any) => {
    this._talentService
      .getTalentsOfTypedProject(event.productionId, event.projectName)
      .pipe(
        map((data) => {
          return data[0].talentVOList;
        })
      )
      .subscribe((data: any) => {
        this.talentDropdownOptions =
          this._dropdownService.getDropdownOptions<any>(
            data,
            'talentName',
            'contractNo'
          );
        console.log('Talent', this.talentDropdownOptions);
        console.log(`Data: ${data}`);
        console.log('TalentName', data[0].talentName);
        console.log('ContractNo', data[0].contractNo);
        // this.contractNo = data[0].contractNo;
      });
  };
  getContract = (event: any) => {
    this.contractNo = event.viewValue;
    console.log(`Contract No: ${event.viewValue}`);
  };
}
