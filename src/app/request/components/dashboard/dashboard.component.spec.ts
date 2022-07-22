import { RouterModule } from '@angular/router';
import { LayoutComponent } from './../../../shared/components/layout/layout.component';
import { BoxContainerComponent } from './../../../shared/components/box-container/box-container.component';
import { RequestListComponent } from './../request-list/request-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { HttpClientModule } from '@angular/common/http';
import { TalentService } from 'src/app/services/talent/talent.service';
import { ProductionService } from 'src/app/services/production/production.service';
import { KeycloakService } from 'keycloak-angular';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const MockDropdownService = {
    getDropdownOptions: jasmine.createSpy().and.returnValue([])
  };

  const MockTalentService = {
    getAllTalents: () => {
      return of([{ talentName: 'abc' }]);
    }
  };
  const MockProductionService = {
    getAllProductions: () => {
      return of([{ productionCompanyName: 'abc' }]);
    }
  };
  const MockKeycloakService = {
    getKeycloakInstance: () => {
      return ['manger'];
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        RequestListComponent,
        BoxContainerComponent,
        LayoutComponent
      ],
      imports: [HttpClientModule],
      providers: [
        { provide: KeycloakService, useValue: MockKeycloakService },
        { provide: DropdownService, useValue: MockDropdownService },
        { provide: TalentService, useValue: MockTalentService },
        { provide: ProductionService, useValue: MockProductionService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
