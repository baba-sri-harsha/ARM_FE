import { RequestSchedule } from './request-schedule';

export interface Request {
  requestId: number;
  productionCompanyName: string;
  productionNumber: string;
  projectName: string;
  talentName: string;
  uniion: string;
  priority: string;
  requestSchedule: RequestSchedule;
  status: string;
}
