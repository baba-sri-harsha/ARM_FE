import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryVO } from 'src/app/models/category-vo';
import { TaskView } from 'src/app/models/task-view';
import { RequestService } from 'src/app/services/request/request.service';
import { MessagedialogComponent } from 'src/app/shared/components/messagedialog/messagedialog.component';

const ELEMENT_DATA: CategoryVO[] = [];

@Component({
  selector: 'app-report-category',
  templateUrl: './report-category.component.html',
  styleUrls: ['./report-category.component.scss']
})
export class ReportCategoryComponent implements OnInit {
  flag: boolean = true;
  catId: number = 0;
  categories: CategoryVO[] = [];
  @ViewChild('select') select!: MatSelect;
  allSelected = false;
  selectedOptions: CategoryVO[] = [];
  isCategorySelected = false;
  data = ELEMENT_DATA;
  model!: string;
  @Output()
  categoryListChange: EventEmitter<CategoryVO[]> = new EventEmitter<CategoryVO[]>();

  auditForms: FormGroup[] = [];

  displayedColumns: string[] = [
    'category',
    'auditPeriod',
    'reportOwner',
    'actions'
  ];
  @Input() reqDetails:Boolean = false;
  @Input() tasks:TaskView[] = [];
  auditPeriod = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  constructor(private _request: RequestService, private fb: FormBuilder,public dailog: MatDialog) {}

  ngOnInit(): void {
    console.log(`Inside ReportCategory`);

    
    this._request.getAllCategories().subscribe({
      next: (data) => {
        (this.categories = data), console.log(data);
      },
      complete: () => console.log('Completed')
    });
  }

  getData(data:any){
    console.log(data);
    return 'hello';
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  getAuditForm(index:number){
    return this.auditForms[index];
  }

  setCombinedFormValues(){
    this.selectedOptions.forEach((option, index) => {
      const currentAuditForm = this.getAuditForm(index);
      option.auditPeriod = {
        startDate: currentAuditForm.value.startDate,
        endDate: currentAuditForm.value.endDate
      }
    });
    this.categoryListChange.emit(this.selectedOptions);
  }

  onStartDateChange(){
   this.setCombinedFormValues();
  }

  onEndDateChange(){
    this.setCombinedFormValues();
  }

  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }

  onNgModelChange(event: any) {
    this.selectedOptions = event;
    console.log(`${this.selectedOptions}`);
    const newData = this.selectedOptions;

    newData.forEach((item) => {
      const auditFormGroup = this.fb.group({
        startDate: '',
        endDate: ''
      });
      this.auditForms.push(auditFormGroup);
    });
    

    this.isCategorySelected = true;
    this.data = newData;
    this.flag = false;
    console.log(this.data);
  }

  selectCategory(a: number) {
    console.log(a);
    this.catId = a;
    const reports = this.data.filter((item) => item.categoryId !== a);
    console.log(reports);
    this.data = reports;
  }
  openDialog(id:number): void {
    const dialogRef = this.dailog.open(MessagedialogComponent, {
      width: '500px',
      height: '500px',
      panelClass: 'chat-dialog',
      data: { taskId: id }
    });
  }
}
