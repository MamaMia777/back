import { Controller, Get, Body, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "../dto/user/create-user.dto";
import { UpdateUserDto } from "../dto/user/update-user.dto";

@Controller('user')
export class AuthController {
    constructor(
        private readonly userService: UsersService
        
        ) { }

    //   @UseGuards(SteamAuthGuard)

    @Post()
    createUser(@Body() dto: CreateUserDto): any {
        return this.userService.createUserRecord(dto)
    }

    @Post('/update')
    updateUser(@Body() dto:UpdateUserDto): any{
        return this.userService.updateUserInfo(dto)
    }

    @Get()
    getUserInfo(): any {
        // Как тут ?
        const steamId = '777'
        return this.userService.getUserInfo(steamId)
    }



}