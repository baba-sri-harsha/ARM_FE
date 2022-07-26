export interface TaskVO {
  requestId: number;
  taskId: number;
  createdBy: string;
  taskDescription: string;
  productionCompanyName: string;
  contractNo?: string;
  productionId: string;
  projectName: string;
  talentName: string;
  priority: string;
  auditStartDate: Date;
  auditEndDate: Date;
  requestRaised: Date;
  requestClosed: Date;
  taskCreator: string;
  reportOwner: string;
  taskCreatorFullName: string;
  reportOwnerFullName: string;
}
