import { LoanStatus } from "../enums/LoanStatus.js";

export interface Loan {
  id: number;
  bookId: number;
  memberId: number;
  borrowedAt: Date;
  dueDate: Date;
  returnedAt?: Date;
  Status: LoanStatus;
}
