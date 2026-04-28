import { readFile, writeFile } from "node:fs/promises";
import type { Loan } from "../models/Loan.js";

export default class LoanRepository {
  async getLoan() {
    try {
      const contents = await readFile("../data/loans.json", {
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
    try {
      const jsonFile = JSON.stringify(list, null, 2);
      await writeFile("../data/loans.json", jsonFile, "utf-8");
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
}
