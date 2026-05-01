import Repository from "../repositories/Repository.js";
import type { Member } from "../models/Member.js";

type CreateNewMember = Pick<Member, "name" | "email">;

export default class MemberServiceTwo {
  constructor(private memberRepo: Repository<Member>) {}

  private counterId = 0;

  async add(member: CreateNewMember) {
    return await this.memberRepo.addData({
      id: ++this.counterId,
      ...member,
      joinAt: new Date(),
      isActive: true,
    });
  }

  async getAllMembers() {
    return await this.memberRepo.getData();
  }

  async getById(id: number): Promise<Member> {
    return (await this.memberRepo.findDataByID(id)) as Member;
  }

  async search(term: string) {
    return await this.memberRepo
      .getData()
      .then((data) =>
        data?.filter((member) =>
          member.name.toLowerCase().includes(term.toLowerCase()),
        ),
      );
  }
}
