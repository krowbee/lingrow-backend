import { Injectable } from '@nestjs/common';
import { Prisma, Word } from '@prisma/client';
import PrismaService from 'src/lib/prisma/prisma.service';

@Injectable()
export class WordService {
  constructor(private prisma: PrismaService) {}

  async getWord(
    wordWhereUniqueInput: Prisma.WordWhereUniqueInput,
  ): Promise<Word | null> {
    return this.prisma.word.findUnique({ where: wordWhereUniqueInput });
  }

  async getWords(wordWhereInput: Prisma.WordWhereInput): Promise<Word[]> {
    return this.prisma.word.findMany({ where: wordWhereInput });
  }
  //Get random words by theme
  async getRandomWords(
    wordWhereInput: Prisma.WordWhereInput,
    takeWords: number,
  ): Promise<Word[]> {
    const words = await this.prisma.word.findMany({
      where: wordWhereInput,
      select: { id: true },
    });

    const randomIds = words
      .map((w) => w.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, takeWords);
    return this.prisma.word.findMany({
      where: { ...(wordWhereInput || undefined), id: { in: randomIds } },
    });
  }

  async createWord(wordCreateInput: Prisma.WordCreateInput): Promise<Word> {
    return this.prisma.word.create({ data: wordCreateInput });
  }

  async updateWord(
    wordWhereUniqueInput: Prisma.WordWhereUniqueInput,
    wordUpdateInput: Prisma.WordUpdateInput,
  ): Promise<Word> {
    return this.prisma.word.update({
      where: wordWhereUniqueInput,
      data: wordUpdateInput,
    });
  }

  async deleteWord(
    wordWhereUniqueInput: Prisma.WordWhereUniqueInput,
  ): Promise<Word> {
    return this.prisma.word.delete({ where: wordWhereUniqueInput });
  }
}
