import { Injectable } from '@nestjs/common';
import { Prisma, Topic } from '@prisma/client';
import PrismaService from 'src/lib/prisma/prisma.service';

@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) {}

  async getTopic(
    topicWhereUniqueInput: Prisma.TopicWhereUniqueInput,
  ): Promise<Topic | null> {
    return this.prisma.topic.findUnique({ where: topicWhereUniqueInput });
  }

  async getTopics(topicWhereInput: Prisma.TopicWhereInput): Promise<Topic[]> {
    return this.prisma.topic.findMany({ where: topicWhereInput || undefined });
  }

  async createTopic(topicCreateInput: Prisma.TopicCreateInput): Promise<Topic> {
    return this.prisma.topic.create({ data: topicCreateInput });
  }

  async updateTopic(
    topicWhereUniqueInput: Prisma.TopicWhereUniqueInput,
    topicUpdateInput: Prisma.TopicUpdateInput,
  ): Promise<Topic> {
    return this.prisma.topic.update({
      where: topicWhereUniqueInput,
      data: topicUpdateInput,
    });
  }

  async deleteTopic(
    topicWhereUniqueInput: Prisma.TopicWhereUniqueInput,
  ): Promise<Topic> {
    return this.prisma.topic.delete({ where: topicWhereUniqueInput });
  }
}
