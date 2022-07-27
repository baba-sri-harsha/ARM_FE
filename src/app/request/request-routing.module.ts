import { MessageComponent } from './../shared/components/message/message.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Role } from '../models/role';
import { AuthGuard } from '../user/auth.guard';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      roles: [Role.USER]
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateRequestComponent
  },
  {
    path: 'request-details/:requestId',
    component: CreateRequestComponent
  },
  { path: 'taskDetails/:taskId', component: TaskDetailsComponent },
  // {
  //   path: 'task-view',
  //   component: TaskViewComponent
  // }
  { path: 'message', component: MessageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule {}
