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
    const isBookExist: Book = await this.BookRepo.bookExistById(bookId);
    const isMemberEixst: Member = await this.MemberRepo.memberExistById(memberId);

    if (!(isMemberEixst && isBookExist)) return "Member or Book doesn't exist!";

    const book: Book = await this.BookRepo.findBookById(bookId);
    const member: Member = await this.MemberRepo.findMemberById(memberId);

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
}
