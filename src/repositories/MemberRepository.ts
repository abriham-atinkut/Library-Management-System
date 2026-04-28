import { readFile, writeFile } from "node:fs/promises";
import type { Member } from "../models/Member.js";

export default class MemberRepository {
  async getMembers() {
    try {
      const contents = await readFile("../data/members.json", {
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
    await this.getMembers().then((data) => list.unshift(...data));
    try {
      const jsonData = JSON.stringify(list, null, 2);
      await writeFile("../data/members.json", jsonData, "utf-8");
      return "New Member is added!";
    } catch (err) {
      console.error(err);
    }
  }

  findMemberById(id: number) {
    const memberById = this.getMembers().then((data) =>
      data.find((member: any) => member.id === id),
    );
    return memberById;
  }
}
