import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeycloakService } from 'keycloak-angular';

import { MessagedialogComponent } from './messagedialog.component';

describe('MessagedialogComponent', () => {
  let component: MessagedialogComponent;
  let fixture: ComponentFixture<MessagedialogComponent>;

  const MockKeycloakService = {
    getKeycloakInstance: () => {
      return ['manger'];
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagedialogComponent],
      imports: [HttpClientModule, MatDialogModule],
      providers: [
        { provide: KeycloakService, useValue: MockKeycloakService },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
