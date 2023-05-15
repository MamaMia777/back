import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SteamStrategy } from './steam.strategy';
import { SteamModule } from './steam/steam.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, AuthModule, SteamModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, SteamStrategy],
})
export class AppModule { }
