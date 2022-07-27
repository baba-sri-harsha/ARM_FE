import { RequestSchedule } from './request-schedule';

export interface CreateRequest {
  requestId: number;
  productionName: string;
  contractNo: string;
  projectName: string;
  talentName: string;
  unionName: string;
  priority: string;
  requestSchedule: RequestSchedule;
  status: string;
  contractDate: Date;
  auditStartDate: Date;
  auditEndDate: Date;
  tasksList: Set<Task>;
  createdBy: string;
}
