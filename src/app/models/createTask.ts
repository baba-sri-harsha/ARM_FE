export interface CreateTask {
  category: {
    categoryId: number;
    reportType: string;
  };
  auditStartDate?: Date;
  auditEndDate?: Date;
  createdBy?: string;
}
