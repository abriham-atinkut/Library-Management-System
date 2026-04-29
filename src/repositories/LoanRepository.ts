import { readFile, writeFile } from "node:fs/promises";
import type { Loan } from "../models/Loan.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class LoanRepository {
  async getLoan() {
    const filePath = path.join(__dirname, "../data/loans.json");
    try {
      const contents = await readFile(filePath, {
        encoding: "utf-8",
      });
      const data = JSON.parse(contents);
      return data;
    } catch (err) {
      console.error("Something want wrong:", err);
    }
  }

  async addLoan(loan: Loan) {
    const list = [{ ...loan }];
    await this.getLoan().then((data) => list.unshift(...data));
    const filePath = path.join(__dirname, "../data/loans.json");
    try {
      const jsonFile = JSON.stringify(list, null, 2);
      await writeFile(filePath, jsonFile, "utf-8");
      return "New loan is added!";
    } catch (err) {
      console.error("Something want wrong when adding Loan!", err);
    }
  }

  getLoanById(id: number) {
    const loanById = this.getLoan().then((data) => {
      return data.find((loan: any) => (loan.id = id));
    });
    return loanById;
  }
  async loanExist(id: number) {
    return await this.getLoan().then((data) =>
      data.some((loan: any) => loan.id === id),
    );
  }
}
