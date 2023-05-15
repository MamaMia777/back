import { Injectable } from '@nestjs/common';
import { IUser } from '@st/common';
import { PrismaClient } from '@prisma/client';

export type User = {
  id: number;
  name: string;
  userName: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  public async createUserRecord(dto: any) {}
  public async updateUserInfo(dto: any) {}
  async getUserInfo(steamId: string): Promise<IUser | undefined> {
    const user = await this.prisma.user.findFirst();
    return user;
  }
}
