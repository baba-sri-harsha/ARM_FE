import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnChanges, AfterViewInit {
  tasks: Task[] = [];
  showLoader: boolean = false;

  displayedColumns: string[] = [
    'requestId',
    'taskDescription',
    'production',
    'productionId',
    'project',
    'talentName',
    'priority',
    'auditPeriod',
    'request',
    'closed',
    'actions'
  ];
  constructor(private _taskService: TaskService) {}

  @Input() searchedValue: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.searchResults();
  }

  ngOnInit(): void {
    this.showLoader = true;
    this.dataSource.filter = this.searchedValue;
    this.dataSource.data = this.tasks;

    this._taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
      this.dataSource.data = data;
      this.dataSource.data = this.tasks;
      this.showLoader = false;
    });

    console.log(this.dataSource);
  }

  dataSource = new MatTableDataSource<Task>();

  @ViewChild('paginator') paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.tasks);
    this.dataSource.paginator = this.paginator;
  }

  searchResults = () => {
    this.dataSource.filter = this.searchedValue.trim().toLowerCase();
  };
}
