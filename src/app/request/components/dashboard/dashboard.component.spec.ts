import { LayoutComponent } from './../../../shared/components/layout/layout.component';
import { BoxContainerComponent } from './../../../shared/components/box-container/box-container.component';
import { RequestListComponent } from './../request-list/request-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DropDownService } from 'src/app/shared/services/drop-down.service';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        RequestListComponent,
        BoxContainerComponent,
        LayoutComponent
      ],
      imports: [HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
