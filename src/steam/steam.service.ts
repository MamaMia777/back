import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ISteamItem, SendTrade } from '../types/interfaces';
import axios, { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, lastValueFrom, map } from 'rxjs';
import { response } from 'express';

@Injectable()
export class SteamService {
    constructor(
        private readonly prisma: PrismaClient,
        private readonly httpService: HttpService,
    ) { }

    async getItemsFromInventory(): Promise<Array<any>> {
        // Возврощает массив вещей
        return this.prisma.steamItem.findMany()
        // Should get by AppID, thus it must be provided via Body params
        // return this.prisma.item.findMany()
    }
    async addItemsToSteamInventory():Promise<any> {
        // Обновляем БД по интвентарю
        // return this.prisma.steamItem.create({})
    }


    async sendTrade(): Promise<any> {
        const headers = {
            'Referer': 'https://steamcommunity.com/tradeoffer/new/?partner=77850668',
            'Cookie': 'bCompletedTradeOfferTutorial=true; sessionid=6f4ffb1bc5037b2e658a63cc; steamLoginSecure=76561198071360480%7C%7CeyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInI6MEQyNl8yMjVBNDQwQ19GNjg1NSIsICJzdWIiOiAiNzY1NjExOTgwNzEzNjA0ODAiLCAiYXVkIjogWyAid2ViIiBdLCAiZXhwIjogMTY4MTIxNDY5MCwgIm5iZiI6IDE2NzI0ODcxNTksICJpYXQiOiAxNjgxMTI3MTU5LCAianRpIjogIjBEMUZfMjI1QTQ0MzFfNkUzOUMiLCAib2F0IjogMTY4MTEyNjUwMSwgInJ0X2V4cCI6IDE2OTkyNTYyMjcsICJwZXIiOiAwLCAiaXBfc3ViamVjdCI6ICI3Ny4zOC4yMzIuMTcwIiwgImlwX2NvbmZpcm1lciI6ICI3Ny4yMTkuOS4xNjciIH0.hf17jLTVawPT1-K6yMvE_WmHInpIJwxuO2rcGe-fpE4u3B0HfWc_WFAUjF6ka5wiGspFvYvp9qCyhtPct8GDCQ'
        }
        const { data } = await firstValueFrom(
            // @ts-ignore
            this.httpService.post('https://steamcommunity.com/tradeoffer/new/send', 
            { 'key': process.env.STEAM_API_KEY }, 
            { headers }).pipe(
                catchError((error: AxiosError) => {
                    console.log('Status :', error.response.statusText);
                    throw 'An error happened!';
                }),
            ),
        );
        return data;

    }
}
