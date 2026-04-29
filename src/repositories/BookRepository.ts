import { readFile, writeFile } from "node:fs/promises";
import type { Book } from "../models/Book.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class BookRepository {
  async loadData() {
    const filePath = path.join(__dirname, "../data/books.json");
    try {
      const contents = await readFile(filePath, {
        encoding: "utf8",
      });
      const data = JSON.parse(contents);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async addBook(book: Book) {
    const collection = [book];
    await this.loadData().then((data) => collection.push(...data));
    const filePath = path.join(__dirname, "../data/books.json");

    try {
      const jsonData = JSON.stringify(collection, null, 2);
      await writeFile(filePath, jsonData, "utf-8");
      return "File is wrtten Successfully";
    } catch (err) {
      console.error("Error writing file: ", err);
    }
  }

  findBookById(id: number) {
    const bookById = this.loadData().then((data) =>
      data.find((book: any) => book.id === id),
    );
    if (!bookById) {
      throw new Error("Book not found!");
    }
    return bookById;
  }

  async bookExistById(id: number) {
    return await this.loadData().then((data) =>
      data.some((book: any) => (book.id = id)),
    );
  }

  async updateBook(book: Book) {
    const collection: Book[] = await this.loadData().then((data) =>
      data.filter((b: Book) => b.id !== book.id),
    );
    collection.push(book);
    const filePath = path.join(__dirname, "../data/books.json");

    try {
      const jsonFile = JSON.stringify(collection, null, 2);
      await writeFile(filePath, jsonFile, "utf-8");
      return "File is updated Successfully";
    } catch (err) {
      console.error("Something want wrong when updating:", err);
    }
  }
}
