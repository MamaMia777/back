import { Injectable } from '@nestjs/common';
import { IUser } from '../types/interfaces';
import { PrismaClient } from '@prisma/client';

export type User = {
    id: number
    name: string
    userName: string
    password: string
}

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaClient,
    ) {

    }
    async getUserInfo(steamId: number): Promise<IUser | undefined> {
        const user = await this.prisma.
}
