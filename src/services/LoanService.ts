import LoanRepository from "../repositories/LoanRepository.js";
import BookRepository from "../repositories/BookRepository.js";
import MemberRepository from "../repositories/MemberRepository.js";
import { LoanStatus } from "../enums/LoanStatus.js";
import type { Loan } from "../models/Loan.js";
import type { Book } from "../models/Book.js";
import type { Member } from "../models/Member.js";

export default class LoanService {
  constructor(
    private LoanRepo: LoanRepository,
    private BookRepo: BookRepository,
    private MemberRepo: MemberRepository,
  ) {}
  private loanCounter = 0;

  async borrowBook(bookId: number, memberId: number) {
    const isBookExist: boolean = await this.BookRepo.bookExistById(bookId);
    const isMemberEixst: boolean =
      await this.MemberRepo.memberExistById(memberId);

    if (!(isMemberEixst && isBookExist)) return "Member or Book doesn't exist!";

    const book = await this.BookRepo.findBookById(bookId);
    const member = await this.MemberRepo.findMemberById(memberId);

    if (!member.isActive) return "Member isn't active!";
    if (!book.isAvailable) return "Book doesn't available";

    const result = await this.LoanRepo.addLoan({
      id: ++this.loanCounter,
      bookId,
      memberId,
      borrowedAt: new Date(),
      dueDate: new Date(),
      Status: LoanStatus.ACTIVE,
    });
    console.log(result);

    book.isAvailable = false;
    this.BookRepo.updateBook(book);

    return "Done, creating loan!";
  }

  async returnBook(id: number) {
    const isLoanExist: boolean = await this.LoanRepo.loanExist(id);
    if (!isLoanExist) return "Loan doesn't exist!";

    const loan: Loan = await this.LoanRepo.getLoanById(id);
    loan.Status = LoanStatus.RETURNED;
    this.LoanRepo.updateLoan(loan);

    let book: Book = await this.BookRepo.findBookById(loan.bookId);
    book.isAvailable = true;
    this.BookRepo.updateBook(book);
    
    return `Loan Id: ${loan.id} book is returned.`;
  }

  async activeLoans() {
    return await this.LoanRepo.getActiveLoans();
  }
}
