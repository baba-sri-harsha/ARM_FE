import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { CategoryVO } from 'src/app/models/category-vo';
import { RequestService } from 'src/app/services/request/request.service';

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

  displayedColumns: string[] = [
    'category',
    'auditPeriod',
    'reportOwner',
    'actions'
  ];

  auditPeriod = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private _request: RequestService, private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(`Inside ReportCategory`);
    this._request.getAllCategories().subscribe({
      next: (data) => {
        (this.categories = data), console.log(data);
      },
      complete: () => console.log('Completed')
    });
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
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
    //   .map((item) => {
    //   return {
    //     categoryId: item.categoryId,
    //     category: item.reportType,
    //     reportOwner: item.ownerName
    //   }
    // })

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
}
