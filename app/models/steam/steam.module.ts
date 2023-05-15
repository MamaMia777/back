import { Module } from '@nestjs/common';
import { SteamService } from './steam.service';
import { SteamController } from './steam.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  providers: [SteamService, PrismaClient],
  controllers: [SteamController],
})
export class SteamModule {}
