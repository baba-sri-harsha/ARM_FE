import { KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TaskService } from 'src/app/services/task/task.service';
import { AuthService } from 'src/app/user/auth.service';
import { TaskListComponent } from './task-list.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [
        MatTableModule,
        MatIconModule,
        HttpClientModule,
        MatDialogModule
      ],
      providers: [AuthService, TaskService, KeycloakService]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
