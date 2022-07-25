import { RequestSchedule } from './request-schedule';

export interface Request {
  requestId: number;
  productionCompanyName: string;
  contractNo: string;
  projectName: string;
  talentName: string;
  uniion: string;
  priority: string;
  requestSchedule: RequestSchedule;
  status: string;
}
