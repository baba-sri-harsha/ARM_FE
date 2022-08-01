import { createRequestSchedule } from './createRequestSchedule';
import { CreateTask } from './createTask';

export interface CreateRequest {
  requestId: number;
  productionName: string;
  contractNo: string;
  projectName: string;
  talentName: string;
  unionName: string;
  priority: string;
  requestSchedule: createRequestSchedule;
  status: string;
  contractDate?: Date;
  auditStartDate?: Date;
  auditEndDate: Date;
  tasksList: CreateTask[];
  createdBy: string | undefined;
}
