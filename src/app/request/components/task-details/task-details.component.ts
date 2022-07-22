import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { TaskVO } from 'src/app/models/taskVO';
import { TaskService } from 'src/app/services/task/task.service';
export interface PeriodicElement {
  category: string;
  reportOwner: string;
}

// const today = new Date();
// const month = today.getMonth();
// const year = today.getFullYear();

const ELEMENT_DATA: PeriodicElement[] = [
  { category: 'Hydrogen', reportOwner: 'H' }
];
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _taskService: TaskService
  ) {}
  taskId!: number;
  taskDetails!: TaskVO;
  displayedColumns: string[] = [
    'category',
    'auditPeriod',
    'Transaction History',
    'actions'
  ];
  data = ELEMENT_DATA;
  model!: string;
  auditPeriod = new FormGroup({
    start: new FormControl(null, Validators.required),
    end: new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
    console.log(`Inside Task Details`);
    this._activatedRoute.paramMap
      .pipe(
        switchMap((map: ParamMap) => {
          let tskId = map.get('taskId');
          if (tskId) this.taskId = parseInt(tskId);
          // console.log(`${this.taskId}`);

          return this._taskService.getTaskById(this.taskId);
        })
      )
      .subscribe((data) => {
        this.taskDetails = data;
        console.log(`Task Date: ${this.taskDetails.auditStartDate}`);
      });
  }
}
