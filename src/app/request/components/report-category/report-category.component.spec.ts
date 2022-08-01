import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { ReportCategoryComponent } from './report-category.component';

describe('ReportCategoryComponent', () => {
  let component: ReportCategoryComponent;
  let fixture: ComponentFixture<ReportCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportCategoryComponent],
      imports: [HttpClientModule, ReactiveFormsModule, MatDialogModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
