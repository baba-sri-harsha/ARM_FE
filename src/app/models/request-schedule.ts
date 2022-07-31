export interface RequestSchedule extends Record<string, any> {
  requestCreated: Date;
  expectedClosure: Date;
  auditEndDate: Date;
auditStartDate: Date;
reportSubmission:Date;
settlementDate:Date;
receiptDate:Date;
}
