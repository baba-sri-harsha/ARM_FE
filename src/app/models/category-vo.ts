
export interface CategoryVO {
    categoryId: number;
    reportType: string;
    ownerName:string;
    owner: {
        ownerName: string;
    },
    auditPeriod: {
        startDate?: Date,
        endDate?:Date
    }
}
