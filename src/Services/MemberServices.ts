

import { Member, LoginMember } from '../dto/eventdto';
import { prisma } from '../prisma';
import { v4 as uuidV4 } from 'uuid';
import CRYPTOJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { Role } from '../../generated/prisma';

class MemberService {
  
  async createMember(data: Member) {
    const hashedPassword = CRYPTOJS.SHA256(data.password).toString();
    return await prisma.member.create({
      data: {
        id: uuidV4(),
        Username: data.Username,
        password: hashedPassword,
        role: data.role as Role,
      },
    });
  }


  async getAllMembers() {
    return await prisma.member.findMany({skip: 0, take: 2});
  }

  
  async updateMember(id: string, data: Member) {
    const hashedPassword = CRYPTOJS.SHA256(data.password).toString();
    return await prisma.member.update({
      data: {
        Username: data.Username,
        password: hashedPassword,
        role: data.role as Role,
      },
      where: { id },
    });
  }

 
  async deleteMember(id: string) {
    return await prisma.member.delete({
      where: { id },
    });
  }

  // Login member and return token
  async loginMember(data: LoginMember): Promise<string | null> {
    const user = await prisma.member.findUnique({
      where: { Username: data.Username },
    });

    if (!user) return null;

    const hashedPassword = CRYPTOJS.SHA256(data.password).toString();
    const isValid = hashedPassword === user.password;

    if (!isValid) return 'INVALID_PASSWORD';

    const token = jwt.sign(
      { password: user.password, role: user.role },
      'Novastrid',
      { expiresIn: '1h' }
    );

    return token;
  }
}

export default new MemberService();
