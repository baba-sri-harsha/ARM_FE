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
}
