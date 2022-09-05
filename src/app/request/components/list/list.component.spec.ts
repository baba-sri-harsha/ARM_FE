import { RequestService } from './../../../services/request/request.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task/task.service';
import { KeycloakService } from 'keycloak-angular';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const MockKeycloakService = {
    getKeycloakInstance: () => {
      return ['manger'];
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientModule, MatDialogModule],

      providers: [
        RequestService,
        TaskService,
        { provide: KeycloakService, useValue: MockKeycloakService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
