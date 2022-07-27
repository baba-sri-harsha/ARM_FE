import { Category } from "./category";

export interface Owner{
      ownerId:number;
      ownerName:string;
      ownerUserId:string;
    
      category:Set<Category>;
}