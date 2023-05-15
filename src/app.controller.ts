import { Controller, Get, Post, UseGuards, Request, Header, Response, Req, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.guard';
import { SteamAuthGuard } from './auth/steam.guard';
import url from 'url';
import { AccessTokenDto } from './dto/access-token.dto';

@Controller('auth')
export class AppController {
}
