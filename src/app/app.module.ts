import { HttpClientModule } from '@angular/common/http';
import {
  NgModule,
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RequestModule } from './request/request.module';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ProductionService } from './services/production/production.service';
import { TalentService } from './services/talent/talent.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RequestModule,
    UserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [ProductionService, TalentService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}
