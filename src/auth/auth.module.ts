import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: 'carthagen', //put in env 
    signOptions: { expiresIn: '60s' }
  }), HttpModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
