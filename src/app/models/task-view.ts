import { Assets } from "./assets";
import { CategoryVO } from './category-vo';

export interface TaskView {
    closedAt: Date;
    createdAt: Date;
    createdBy: string;
    deleted:boolean;
    taskId:number;
    updatedAt: Date;
    updatedBy: string;
    category:CategoryVO;
    auditStartDate: Date;
    auditEndDate: Date;
    assets:Set<Assets>;
}
