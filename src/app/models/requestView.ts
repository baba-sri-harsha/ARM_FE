import { RequestSchedule } from './request-schedule';
import { TaskView } from './task-view';

export interface RequestView {
  requestId: number;
  productionName: string;
  productionNumber: string;
  contractNo: string;
  contractDate: Date;
  projectName: string;
  talentName: string;
  unionName: string;
  priority: string;
  requestSchedule: RequestSchedule;
  status: string;
  tasksList: Set<TaskView>;
}
