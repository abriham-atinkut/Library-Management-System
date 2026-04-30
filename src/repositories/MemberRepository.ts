import { readFile, writeFile } from "node:fs/promises";
import type { Member } from "../models/Member.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class MemberRepository {
  async getMembers() {
    const filePath = path.join(__dirname, "../data/members.json");
    try {
      const contents = await readFile(filePath, {
        encoding: "utf-8",
      });
      const data = JSON.parse(contents);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async addMember(member: Member) {
    const list = [{ ...member }];
    await this.getMembers().then((data) => list.push(...data));
    const filePath = path.join(__dirname, "../data/members.json");
    try {
      const jsonData = JSON.stringify(list, null, 2);
      await writeFile(filePath, jsonData, "utf-8");
      return "New Member is added!";
    } catch (err) {
      console.error(err);
    }
  }

  findMemberById(id: number) {
    const memberById = this.getMembers().then((data: Member[]) =>
      data.find((member) => member.id === id),
    );
    return memberById;
  }
  
  async memberExistById(id: number) {
    return await this.getMembers().then((data: Member[]) =>
      data.some((member) => member.id === id),
    );
  }

  async searchMember(term: string) {
    const members = await this.getMembers().then((data: Member[]) =>
      data.filter((member) => member.name.toLowerCase().includes(term.toLowerCase())),
    );
    if (members.length === 0) {
      return "Member didn't exist. Search using another key word.";
    }
    return members;
  }
}
