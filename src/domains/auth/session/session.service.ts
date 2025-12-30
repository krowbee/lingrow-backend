import { Injectable } from '@nestjs/common';
import { Prisma, Session } from '@prisma/client';
import PrismaService from 'src/lib/prisma/prisma.service';
import { CreateSessionData, UpdateSessionData } from './session.types';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async getSession(
    sessionWhereUniqueInput: Prisma.SessionWhereUniqueInput,
  ): Promise<Session | null> {
    return this.prisma.session.findUnique({ where: sessionWhereUniqueInput });
  }

  async createSession(sessionCreateData: CreateSessionData): Promise<Session> {
    const expireAt = this.getSessionExpireDate();
    return this.prisma.session.create({
      data: {
        jti: sessionCreateData.jti,
        hashedRefreshToken: sessionCreateData.hashedRefreshToken,
        expireAt: expireAt,
        user: { connect: { id: sessionCreateData.userId } },
      },
    });
  }

  async updateSession(
    sessionWhereUniqueInput: Prisma.SessionWhereUniqueInput,
    sessionUpdateData: UpdateSessionData,
  ): Promise<Session> {
    const expireAt = this.getSessionExpireDate();
    return this.prisma.session.update({
      where: sessionWhereUniqueInput,
      data: {
        jti: sessionUpdateData.jti,
        hashedRefreshToken: sessionUpdateData.hashedRefreshToken,
        expireAt: expireAt,
      },
    });
  }

  async deleteSession(
    sessionWhereUniqueInput: Prisma.SessionWhereUniqueInput,
  ): Promise<Session> {
    return this.prisma.session.delete({ where: sessionWhereUniqueInput });
  }

  private readonly SESSION_TTL = 7 * 24 * 60 * 60 * 1000;
  private getSessionExpireDate(): Date {
    return new Date(Date.now() + this.SESSION_TTL);
  }
}
