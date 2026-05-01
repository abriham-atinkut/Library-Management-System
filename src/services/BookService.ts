import BookRepository from "../repositories/BookRepository.js";
import type { Book } from "../models/Book.js";
type CreateBookInput = Omit<Book, "id" | "isAvailable" | "createAt">;

export default class BookService {
  constructor(private bookRepo: BookRepository) {}
  private idCounter = 3;

  async add(book: CreateBookInput) {
    return await this.bookRepo.addBook({
      id: ++this.idCounter,
      ...book,
      isAvailable: true,
      createAt: new Date(),
    });
  }

  async getBook(id: number) {
    return await this.bookRepo.findBookById(id);
  }

  async getAllBooks() {
    return await this.bookRepo.loadData();
  }
}

