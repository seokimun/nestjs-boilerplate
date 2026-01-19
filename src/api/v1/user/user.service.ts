import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { FindOrCreateUserInput } from './Input/create-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOrCreate(data: FindOrCreateUserInput) {
    const email = data.email.trim().toLowerCase();
    const name = data.name.trim();

    return this.prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
        role: 'USER',
      },
      select: { id: true, email: true, role: true },
    });
  }

  async findById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true },
    });
  }
}
