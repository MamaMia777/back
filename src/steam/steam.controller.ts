import { Controller, Get, Post, UseGuards, Request, Header, Response, Req, Body } from '@nestjs/common';
import { SteamService } from './steam.service';
import { PrismaClient } from '@prisma/client';
// import { SendTrade } from '../types/interfaces';

@Controller('steam')
export class SteamController {
    constructor(
        private steamService: SteamService
    ) { }

    @Get('items')
    getItems() {
        return this.steamService.getItemsFromInventory()
    }
    @Post('trade')
    sendTrade(@Body() dto: any) {
        return this.steamService.sendTrade()
    }
}
