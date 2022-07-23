import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { MessageService } from '../../services/message.service';
import { KeycloakService } from 'keycloak-angular';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  const MockKeycloakService = {
    getKeycloakInstance: () => {
      return ['manger'];
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageComponent],
      imports: [HttpClientModule],
      providers: [
        MessageService,
        { provide: KeycloakService, useValue: MockKeycloakService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
