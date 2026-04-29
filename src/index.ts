/**
 * Book Service and Repository in Action
 */

import BookRepository from "./repositories/BookRepository.js";
import BookService from "./services/BookService.js";

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

import MemberRepository from "./repositories/MemberRepository.js";
import MemberService from "./services/MemberService.js";

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
