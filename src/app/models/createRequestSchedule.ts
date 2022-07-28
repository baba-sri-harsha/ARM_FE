export type createRequestSchedule = {
  requestCreated: Date;
  expectedClosure: Date;
  auditStartDate: Date;
  auditEndDate: Date;
  reportSubmission: Date;
  settlementDate: Date;
  receiptDate: Date;
  createdBy: string;
  request?: Request;
};
