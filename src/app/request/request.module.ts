import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModule } from '../user/user.module';
import { RequestRoutingModule } from './request-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ReportCategoryComponent } from './components/report-category/report-category.component';
import { ImportantDatesComponent } from './components/important-dates/important-dates.component';
import { DocumentsDossierComponent } from './components/documents-dossier/documents-dossier.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ContractDetailsComponent } from './components/contract-details/contract-details.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListComponent } from './components/list/list.component';
@NgModule({
  declarations: [
    DashboardComponent,
    CreateRequestComponent,
    TaskListComponent,
    RequestListComponent,
    ReportCategoryComponent,
    ImportantDatesComponent,
    DocumentsDossierComponent,
    TaskDetailsComponent,
    ContractDetailsComponent,
    ListComponent
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
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  exports: [RequestListComponent],
  providers: []
})
export class RequestModule {}
