import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/prisma/prisma.service';
import { FindOrCreateUserInput } from './Input/create-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOrCreate(data: FindOrCreateUserInput) {
    const email = data.email.trim().toLowerCase();
    const name = data.name.trim();

    return this.prisma.user.upsert({
      where: { email },
      update: {
        // 로그인 할때마다 name을 동기화할지 결정
        // 변경하지 않는게 안전 (경우에 따라 사용)
      },
      create: {
        email,
        name,
      },
    });
  }
}
