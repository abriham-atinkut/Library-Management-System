import BookRepository from "./repositories/BookRepository.js";
import BookService from "./services/BookService.js";

import MemberRepository from "./repositories/MemberRepository.js";
import MemberService from "./services/MemberService.js";

import LoanRepository from "./repositories/LoanRepository.js";
import LoanService from "./services/LoanService.js";

/**
 * Book Service and Repository in Action
 */

let bookRepo = new BookRepository();
let bookServices = new BookService(bookRepo);

// * Add book in data
let obj = {
  title: "Clean Code",
  author: "Uncle Bob",
  isbn: "123456",
  category: "Programming",
};
let add = await bookServices.add(obj);
console.log(add);

// * Get book by Id
let book = await bookServices.getBook(2);
console.log(book);

// * Get all Books
let allBook = await bookServices.getAllBooks();
console.log(allBook);

/**
 * Member Service and Repository in Action
 */

const memberRepo = new MemberRepository();
const members = new MemberService(memberRepo);

const memberObj = {
  name: "Abriham",
  email: "abriham@dengene.com",
};

// * Add member or file writing
const result = await members.add(memberObj);
console.log(result);

// * Get all members
const allMembers = await members.getAllMembers();
console.log(allMembers);

// * Get member by Id
const oneMember = await members.getById(62);
console.log(oneMember);

// * Get member by search By name
const searchResult = await members.search("ab")
console.log(searchResult);
/**
 * Loan Service and Repository in Action
 */

const loanRepo = new LoanRepository();
const loanServices = new LoanService(loanRepo, bookRepo, memberRepo);

// * Borrow Book: Parameters (bookId, memberId)
// * This will change isAvailable to "false" in books.json file
const loan = await loanServices.borrowBook(2, 57);
console.log(loan);

// * Return Book: using loan Id
// * This will also change isAvailable to "true" in books.json file
const returnedLoan = await loanServices.returnBook(1);
console.log(returnedLoan);

// * Returns All Books
const active = await loanServices.activeLoans();
console.log(active);
