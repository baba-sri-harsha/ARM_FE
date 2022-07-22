export interface TaskVO {
  requestId: number;
  taskId: number;
  taskDescription: string;
  productionCompanyName: string;
  ProductionNumber?: string;
  productionId: string;
  projectName: string;
  talentName: string;
  priority: string;
  auditStartDate: Date;
  auditEndDate: Date;
  requestRaised: Date;
  requestClosed: Date;
}
