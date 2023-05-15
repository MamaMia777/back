import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from '../dto/access-token.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom, from } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly httpService: HttpService,
        private jwtService: JwtService
    ) { }

    // Login with steam
    // 


    async validateUser(userName: string, password: string): Promise<any> {
        // const user = await this.usersService.findOne(userName)
        // if (user && password === user.password) {
        //     const { password, userName, ...rest } = user
        //     return rest
        // }
        // return null
    }
    login(payload: any) {
        const accessToken = this.jwtService.sign(payload)
        return { accessToken }
    }

}
