export interface CreateTask {
    categoryId: number;
    requestId: number;
    auditStartDate?: Date;
    auditEndDate?: Date;
    createdBy?: string;
  }