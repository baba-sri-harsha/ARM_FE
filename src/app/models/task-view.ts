import { Assets } from "./assets";
import { Category } from "./category";

export interface TaskView {
    closedAt: Date;
    createdAt: Date;
    createdBy: string;
    deleted:boolean;
    taskId:number;
    updatedAt: Date;
    updatedBy: string;
    category:Category;
    auditStartDate: Date;
    auditEndDate: Date;
    assets:Set<Assets>;
}
