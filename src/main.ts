/**
 * Generic Example Test
 */
// * import Generic Repositroy

import Repository from "./repositories/Repository.js";

import BookServiceTwo from "./services Two/BookService2.js";
import type { Book } from "./models/Book.js";

const bookRepo = new Repository<Book>("../data/books.json");
const bookService = new BookServiceTwo(bookRepo);

// * Get all books
const allBooks = await bookService.getAllBooks();
console.log(allBooks);

// * Get Book by Id
const book = await bookService.getBook(333);
console.log("The Book we are looking for:", book);

let obj = {
  title: "New way",
  author: "Abriham",
  isbn: "38384",
  category: "Life",
};

// * Add Book
const addBook = await bookService.add(obj);
console.log(addBook);

// * Check if book Exist
const isBookExist = await bookService.bookExist(393);
console.log(isBookExist);

/**
 * Member Service in action
 */

import MemberServiceTwo from "./services Two/MemberService2.js";
import type { Member } from "./models/Member.js";

const memberRepo = new Repository<Member>("../data/members.json");
const memberService = new MemberServiceTwo(memberRepo);

// * Get all Member
const members = await memberService.getAllMembers();
console.log(members);

// * Get member By Id
const member = await memberService.getById(57);
console.log(member);

const memberObj = {
  name: "Kebede",
  email: "kebede@example.com",
};

// * Add member
const addMember = await memberService.add(memberObj);
console.log(addMember);

/**
 * Loan Service in Action
 */

import LoanServiceTwo from "./services Two/LoanService2.js";
import type { Loan } from "./models/Loan.js";

let loanRepo = new Repository<Loan>("../data/loans.json");
let loanService = new LoanServiceTwo(loanRepo, bookRepo, memberRepo);

// * List Active loans
let activeLoan = await loanService.activeLoans();
console.log(activeLoan);

let borrowBook = await loanService.borrowBook(4, 1);
console.log(borrowBook);

let returnBook = await loanService.returnBook(1);
console.log(returnBook);
