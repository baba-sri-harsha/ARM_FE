export interface Task {
  requestId: number;
  taskId: number;
  taskDescription: string;
  production: string;
  productionId: string;
  project: string;
  talentName: string;
  priority: string;
  auditStartDate: Date;
  auditEndDate: Date;
  requestRaised: Date;
  requestClosed: Date;
}
