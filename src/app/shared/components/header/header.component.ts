import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from 'src/app/user/auth.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = true;
  public loggedIn: boolean = false;
  public userProfile: KeycloakProfile = {};
  firstName: string | undefined;

  constructor(
    private auth: AuthService,
    private keycloakService: KeycloakService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loggedIn = await this.auth.isLoggedIn();
    if (this.loggedIn) {
      this.userProfile = await this.auth.loadUserProfile();
      // console.log(this.userProfile);
      this.firstName = this.userProfile.firstName;
    } else {
      this.auth.login();
    }

    // Getting roles of user
    // let roles =
    //   this.keycloakService.getKeycloakInstance().realmAccess?.['roles'];
    // console.log(`Roles: ${roles}`);
    // if (roles?.indexOf('report_owner') != -1) {
    //   console.log(`report_owner`);
    // }
    // if (roles?.indexOf('user') != -1) {
    //   console.log(`user`);
    // }

    // else {
    //   console.log(`User role not found`);
    // }
  }
}
