import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Repository<T extends { id: number }> {
  // To use Generic Repository class we need to pass json data path
  constructor(private path: string) {}

  async getData() {
    const filePath = path.join(__dirname, this.path);
    try {
      const contents = await readFile(filePath, {
        encoding: "utf-8",
      });
      return JSON.parse(contents) as T[];
    } catch (err) {
      console.error("Something want wrong:", err);
    }
  }

  async addData(input: T) {
    const list = [{ ...input }];
    await this.getData().then((data) =>
      data !== undefined ? list.unshift(...data) : [],
    );
    const filePath = path.join(__dirname, this.path);

    try {
      const jsonFile = JSON.stringify(list, null, 2);
      await writeFile(filePath, jsonFile, "utf-8");
      return "New data is added!";
    } catch (err) {
      console.error("Something want wrong when adding Loan!", err);
    }
  }

  async findDataByID(id: number) {
    const dataById = await this.getData().then((data) =>
      data !== undefined ? data.find((value: T) => value.id === id) : {},
    );
    if (dataById === undefined || Object.keys(dataById).length === 0) {
      return "Data not found!";
    }
    return dataById;
  }

  async dataExistById(id: number): Promise<boolean> {
    return await this.getData().then((data) =>
      data !== undefined ? data.some((value: T) => value.id === id) : false,
    );
  }

  async updataData(item: T) {
    const collection: T[] = await this.getData().then((data) =>
      data !== undefined ? data.filter((b: T) => b.id !== item.id) : [],
    );
    collection.push(item);
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
