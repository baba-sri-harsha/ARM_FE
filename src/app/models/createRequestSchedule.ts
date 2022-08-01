export interface createRequestSchedule extends Record<string, any> {
  requestCreated: Date | null;
  expectedClosure: Date | null;
  auditStartDate?: Date | null;
  auditEndDate?: Date | null;
  reportSubmission: Date | null;
  settlementDate: Date | null;
  receiptDate: Date | null;
  createdBy: string;
  request?: Request;
}
