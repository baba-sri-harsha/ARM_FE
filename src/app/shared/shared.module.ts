import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutComponent } from './components/layout/layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BoxContainerComponent } from './components/box-container/box-container.component';
import { MatTableModule } from '@angular/material/table';
import { SearchComponent } from './components/search/search.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContractDropdownComponent } from './components/contract-dropdown/contract-dropdown/contract-dropdown.component';
import { MessageComponent } from './components/message/message.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MessagedialogComponent } from './components/messagedialog/messagedialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    HeaderComponent,
    DropdownComponent,
    BoxContainerComponent,
    SearchComponent,
    ContractDropdownComponent,
    MessageComponent,
    MessagedialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSortModule,
    RouterModule.forChild([])
  ],
  exports: [
    LayoutComponent,
    MatDatepickerModule,
    HeaderComponent,
    DropdownComponent,
    MatTableModule,
    MatIconModule,
    BoxContainerComponent,
    MatTooltipModule,
    SearchComponent,
    ContractDropdownComponent,
    MessageComponent,
    MatDialogModule,
    MatSortModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: []
})
export class SharedModule {}
