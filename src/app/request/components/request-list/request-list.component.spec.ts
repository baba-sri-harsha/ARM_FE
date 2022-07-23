import { MatDialogModule } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestListComponent } from './request-list.component';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

describe('RequestListComponent', () => {
  let component: RequestListComponent;
  let fixture: ComponentFixture<RequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestListComponent],
      imports: [
        MatTableModule,
        MatIconModule,
        HttpClientModule,
        MatDialogModule
      ],
      providers: [KeycloakService]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
