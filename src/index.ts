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