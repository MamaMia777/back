import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from './dto/access-token.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
}
