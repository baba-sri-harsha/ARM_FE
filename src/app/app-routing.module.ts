import { DashboardComponent } from './request/components/dashboard/dashboard.component';
import { TaskListComponent } from './request/components/task-list/task-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: '/dashboard',
    
  // }
  // {
  //   path: 'tasks',
  //   component: DashboardComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
