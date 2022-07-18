import { MatPaginator } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModule } from '../user/user.module';
import { RequestRoutingModule } from './request-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ContractDetailsComponent } from './components/contract-details/contract-details.component';
import { ReportCategoryComponent } from './components/report-category/report-category.component';
import { ImportantDatesComponent } from './components/important-dates/important-dates.component';
import { DocumentsDossierComponent } from './components/documents-dossier/documents-dossier.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { ProductionService } from '../services/production/production.service';
import { TalentService } from '../services/talent/talent.service';
@NgModule({
  declarations: [
    DashboardComponent,
    CreateRequestComponent,
    TaskListComponent,
    RequestListComponent,
    ContractDetailsComponent,
    ReportCategoryComponent,
    ImportantDatesComponent,
    DocumentsDossierComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    UserModule,
    RequestRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule
  ],
  exports: [RequestListComponent],
  providers: [ProductionService, TalentService]
})
export class RequestModule {}
