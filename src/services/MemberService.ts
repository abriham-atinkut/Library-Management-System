import MemberRepository from "../repositories/MemberRepository.js";
import type { Member } from "../models/Member.js";

type CreateNewMember = Pick<Member, "name" | "email">;

export default class MemberService {
  constructor(private memberRepo: MemberRepository) {}
  private counterId = 0;

  async add(member: CreateNewMember) {
    return await this.memberRepo.addMember({
      id: ++this.counterId,
      ...member,
      joinAt: new Date(),
      isActive: true,
    });
  }
  
  async getAllMembers() {
    return await this.memberRepo.getMembers();
  }

  async getById(id: number) {
    return await this.memberRepo.findMemberById(id);
  }

  async search(term: string) {
    return await this.memberRepo.searchMember(term);
  }
}
