import { Injectable } from '@nestjs/common';
import PrismaService from 'src/lib/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findUsers(userWhereInput: Prisma.UserWhereInput) {
    return this.prisma.user.findMany({ where: userWhereInput || undefined });
  }

  async userCreate(userCreateInput: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: userCreateInput });
  }

  async userUpdate(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    userUpdateInput: Prisma.UserUpdateInput,
  ) {
    return this.prisma.user.update({
      data: userUpdateInput,
      where: userWhereUniqueInput,
    });
  }

  async userDelete(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({ where: userWhereUniqueInput });
  }
}
