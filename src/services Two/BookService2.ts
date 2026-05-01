import type { Book } from "../models/Book.js";
import Repository from "../repositories/Repository.js";

type CreateBookInput = Omit<Book, "id" | "isAvailable" | "createAt">;

export default class BookServiceTwo {
  constructor(private bookRepo: Repository<Book>) {}
  private idCounter = 3;

  async add(book: CreateBookInput) {
    return await this.bookRepo.addData({
      id: ++this.idCounter,
      ...book,
      isAvailable: true,
      createAt: new Date(),
    });
  }
  
  async getBook(id: number) {
    return await this.bookRepo.findDataByID(id);
  }

  async getAllBooks(): Promise<Book[] | string> {
    const books = await this.bookRepo.getData();
    if(!books) return "Book you are looking for didn't Exist."
    return books
  }

  async bookExist(id: number): Promise<boolean> {
    return await this.bookRepo.dataExistById(id);
  }

  async update(book: Book) {
    return await this.bookRepo.updataData(book);
  }
}
