import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
