import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductionService } from 'src/app/services/production/production.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { TalentService } from 'src/app/services/talent/talent.service';
import { ContractDetailsComponent } from './contract-details.component';
import { of } from 'rxjs';

const MockProductionService = {
  getAllProductions: () => of([])
};

const MockProjectService = {
  getAllProjects: () => of([])
};

const MockTalentService = {
  getAllTalents: () => of([])
};


describe('ContractDetailsComponent', () => {
  let component: ContractDetailsComponent;
  let fixture: ComponentFixture<ContractDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractDetailsComponent ],
      providers: [
        {
          provide: ProductionService, useValue: MockProductionService
        },
        {
          provide: ProjectService, useValue: MockProjectService
        },
        {
          provide: TalentService, useValue: MockTalentService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
