import { LayoutComponent } from './../../../shared/components/layout/layout.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateRequestComponent } from './create-request.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/user/auth.service';

const MockAuthService = {
  loadUserProfile: Promise.resolve({})
}

describe('CreateRequestComponent', () => {
  let component: CreateRequestComponent;
  let fixture: ComponentFixture<CreateRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRequestComponent, LayoutComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        {provide: AuthService, useValue: MockAuthService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
