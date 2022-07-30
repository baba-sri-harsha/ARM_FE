import { ContractDetails } from './../../../models/contractDetails';
import { CreateRequestComponent } from './../create-request/create-request.component';
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
import { Category } from 'src/app/models/category';
import { TaskService } from 'src/app/services/task/task.service';
import { Router } from '@angular/router';

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
  contractDetails: ContractDetails = {
    productionName: '',
    contractNo: '',
    projectName: '',
    talentName: ''
  };
  productionDropdownOptions: DropdownOption[] = [];
  projectDropdownOptions: DropdownOption[] = [];
  talentDropdownOptions: DropdownOption[] = [];
  contractNo!: string;
  @Input() request: RequestView = {
    requestId: 0,
    productionName: '',
    productionNumber: '',
    contractNo: '',
    projectName: '',
    contractDate: new Date(),
    talentName: '',
    unionName: '',
    priority: '',
    requestSchedule: {
      requestCreated: new Date(),
      expectedClosure: new Date(),
      auditEndDate: new Date(),
      auditStartDate: new Date(),
      reportSubmission: new Date(),
      settlementDate: new Date(),
      receiptDate: new Date()
    },
    status: '',
    tasksList: new Set()
  };

  @Input() url: boolean = false;
  taskList: TaskView[] = [];
  categories: Category[] = [];
  currentUrl: string = '';
  constructor(
    private _productionService: ProductionService,
    private _talentService: TalentService,
    private _projectService: ProjectService,
    private _dropdownService: DropdownService,
    private _taskService: TaskService,
    private _router: Router,
  ) {}

  myControl = new FormControl('');
  myControl2 = new FormControl('');
  myControl3 = new FormControl('');

  reqId:number = 0;
  @Input() requestView:boolean = false;

  ngOnInit(): void {
    this.currentUrl = this._router.url;
    console.log(this.currentUrl);

    if (this.currentUrl.includes('request-details' || '/requestView-details')) {
      let sp = this.currentUrl.split('/', 3);
      this.reqId = parseInt(sp[2]);
      this._taskService.getTasksByReqId(this.reqId).subscribe({
        next: (data) => {
          this.taskList = data;
          if (this.taskList.length > 0) {
            this.taskList.forEach((task) => {
              this.categories.push(task.category);
            });
          }
          console.log('zzz', this.categories);
        }
      });
    } else {
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
  }
  productionId: number = 0;
  getProjects = (event: any) => {
    let productionId = parseInt(event.viewValue);
    this.contractDetails.productionName = event.value;
    console.log(this.contractDetails);

    console.log('pId', productionId);
    this._projectService
      .getProjectsOfTypedProduction(this.productionId)
      .pipe(
        map((data) => {
          return data;
        })
      )
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
    this.contractDetails.projectName = event.value;
    console.log(event.value);
    console.log(this.contractDetails);
    this._talentService
      .getTalentsOfTypedProject(this.productionId, event.value)
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
      });
  };

  getContract = (event: any) => {
    this.contractDetails.talentName = event.value;
    this.contractDetails.contractNo = event.viewValue;
    this.contractNo = event.viewValue;
    console.log(`Contract No: ${event.viewValue}`);
    console.log(this.contractDetails);
  };
}
