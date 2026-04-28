import { readFile, writeFile } from "node:fs/promises";
import type { Book } from "../models/Book.js";

export default class BookRepository {
  async loadData() {
    try {
      const contents = await readFile("../data/books.json", {
        encoding: "utf8",
      });
      const data = JSON.parse(contents);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async addBook(book: Book) {
    const collection = [{ ...book }];
    await this.loadData().then((data) => collection.push(...data));

    try {
      const jsonData = JSON.stringify(collection);
      await writeFile("../data/books.json", jsonData, "utf-8");
      return "File is wrtten Successfully";
    } catch (err) {
      console.error("Error writing file: ", err);
    }
  }

  getAllBooks() {
    return this.loadData().then((data) => data);
  }

  findBookById(id: number) {
    const bookById = this.loadData().then((data) =>
      data.find((book: any) => book.id === id),
    );
    return bookById;
  }
}
