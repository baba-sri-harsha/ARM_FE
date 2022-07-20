import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  roles: string[] | undefined;
  role: string = '';

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    console.log('inside NavbarComponent ngOnInit');

    this.roles =
      this.keycloakService.getKeycloakInstance().realmAccess?.['roles'];
    if (this.roles?.indexOf('report_owner') != -1) {
      this.role = 'report_owner';
    } else {
      this.role = 'manager';
    }
  }
}
