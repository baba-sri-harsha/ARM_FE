import { ContractDetails } from './../../../models/contractDetails';
import { CreateRequestComponent } from './../create-request/create-request.component';
import { AfterViewInit, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
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
import { CategoryVO } from 'src/app/models/category-vo';

export interface ImportantDate {
  option: string;
  name:string;
  date?: Date | null;
  ctrl?: FormControl;
}

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
    talentName: '',
    categories: [],
    contractDate: new Date()
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

  @Output() contractDetailsChange: EventEmitter<ContractDetails> =
    new EventEmitter();
  @Output() importantDatesChanged: EventEmitter<ImportantDate[]> =
    new EventEmitter<ImportantDate[]>();

  @Input() url: boolean = false;
  taskList: TaskView[] = [];
  categories: CategoryVO[] = [];
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
    taskId:number[]=[]
  reqId:number = 0;

  ngOnInit(): void {
    this.currentUrl = this._router.url;
    console.log(this.currentUrl);

    if (this.currentUrl.includes('request-details')) {
      let sp = this.currentUrl.split('/', 3);
      this.reqId = parseInt(sp[2]);
      this._taskService.getTasksByReqId(this.reqId).subscribe({
        next: (data) => {
          this.taskList = data;
          if (this.taskList.length > 0) {
            this.categories = this.taskList.map(task => task.category);
            this.taskId=this.taskList.map(task=>task.taskId);
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

  onCategoryListChange(categories: CategoryVO[]) {
    console.log(categories);
    this.contractDetails.categories = categories;
    this.contractDetailsChange.emit(this.contractDetails);
  }

  getProjects = (event: any) => {
    
    this.productionId = parseInt(event.viewValue);
    this.contractDetails.productionName = event.value;
    console.log(this.contractDetails);

    console.log('pId', this.productionId);
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
    this.request.contractNo = event.viewValue;
    console.log(`Contract No: ${event.viewValue}`);
    console.log("heyyyy",this.contractDetails);
  };

  onContractDateChange = (event: any) => {
    let contractDate = event.target.value;
    if (contractDate) {
      this.contractDetails.contractDate = contractDate;
    }
  };

  impDates: ImportantDate[] = [];
  onImportantDatesChanged(importantDates: ImportantDate[]) {
    this.impDates = importantDates;
    if (this.impDates) {
      this.importantDatesChanged.emit(this.impDates);
    }
  }
}
