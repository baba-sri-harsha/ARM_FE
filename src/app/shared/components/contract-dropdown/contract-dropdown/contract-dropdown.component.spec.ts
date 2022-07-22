import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ContractDropdownComponent } from './contract-dropdown.component';

describe('ContractDropdownComponent', () => {
  let component: ContractDropdownComponent;
  let fixture: ComponentFixture<ContractDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractDropdownComponent ],
      imports: [MatAutocompleteModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});