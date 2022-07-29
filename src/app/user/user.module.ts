import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from './keycloak-initializer';

import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, KeycloakAngularModule],
  exports: [SharedModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ]
})
export class UserModule {}
