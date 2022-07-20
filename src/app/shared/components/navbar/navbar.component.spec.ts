import { KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [];
const MockKeycloakService = {
  getKeycloakInstance: () => {
    return ['manger'];
  }
};

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        MatIconModule,
        HttpClientModule,
        MatButtonModule,
        RouterModule.forRoot([])
      ],
      providers: [{ provide: KeycloakService, useValue: MockKeycloakService }]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
