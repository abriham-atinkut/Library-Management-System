import Repository from "../repositories/Repository.js";
import { LoanStatus } from "../enums/LoanStatus.js";
import type { Loan } from "../models/Loan.js";
import type { Book } from "../models/Book.js";
import type { Member } from "../models/Member.js";

export default class LoanServiceTwo {
  constructor(
    private LoanRepo: Repository<Loan>,
    private BookRepo: Repository<Book>,
    private MemberRepo: Repository<Member>,
  ) {}
  private loanCounter = 0;

  async borrowBook(bookId: number, memberId: number) {
    const isBookExist: boolean = await this.BookRepo.dataExistById(bookId);
    const isMemberEixst: boolean =
      await this.MemberRepo.dataExistById(memberId);

    if (!(isMemberEixst && isBookExist)) return "Member or Book doesn't exist!";

    const book = (await this.BookRepo.findDataByID(bookId)) as Book;
    const member = (await this.MemberRepo.findDataByID(memberId)) as Member;

    if (!member.isActive) return "Member isn't active!";
    if (!book.isAvailable) return "Book doesn't available";

    const result = await this.LoanRepo.addData({
      id: ++this.loanCounter,
      bookId,
      memberId,
      borrowedAt: new Date(),
      dueDate: new Date(),
      Status: LoanStatus.ACTIVE,
    });
    console.log(result);

    book.isAvailable = false;
    this.BookRepo.updataData(book);

    return "Done, creating loan!";
  }

  async returnBook(id: number) {
    const isLoanExist: boolean = await this.LoanRepo.dataExistById(id);
    if (!isLoanExist) return "Loan doesn't exist!";

    const loan = (await this.LoanRepo.findDataByID(id)) as Loan;
    loan.Status = LoanStatus.RETURNED;
    this.LoanRepo.updataData(loan);

    let book = (await this.BookRepo.findDataByID(loan.bookId)) as Book;
    book.isAvailable = true;
    this.BookRepo.updataData(book);

    return `Loan Id: ${loan.id} book is returned.`;
  }

  async activeLoans() {
    return await this.LoanRepo.getData().then((data) =>
      data?.filter((loan) => loan.Status === "ACTIVE"),
    );
  }
}
