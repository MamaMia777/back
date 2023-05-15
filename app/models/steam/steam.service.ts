import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { IOrdersObject, ISteamInventory, ISteamMarket } from '@st/common';

@Injectable()
export class SteamService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly httpService: HttpService,
  ) {}

  async getItemsFromInventory(): Promise<Array<any>> {
    // Возврощает массив вещей
    return this.prisma.steamItem.findMany();
    // Should get by AppID, thus it must be provided via Body params
    // return this.prisma.item.findMany()
  }
  async addItemsToSteamInventory(): Promise<any> {
    // Обновляем БД по интвентарю
    // return this.prisma.steamItem.create({})
  }

  private async getUserInventory(steamId: string, appid: string) {
    const { data } = await axios.get<ISteamInventory>(
      `http://steamcommunity.com/inventory/${steamId}/${appid}/2?l=english&count=5000`,
    );
    if (!data) return null; //Get only without trade ban & marketable
    const inventory = data.descriptions
      .filter((el) => el.tradable === 1)
      .filter((el) => el.marketable === 1);

    const temp: Array<IOrdersObject> = [];

    for (const inv of inventory) {
      const url = new URL('http://steamcommunity.com/market/priceoverview/');
      url.searchParams.append('appid', appid);
      url.searchParams.append('market_hash_name', inv.market_hash_name);
      url.searchParams.append('currency', '1');
      axios
        .get<ISteamMarket>(url.toString())
        .then((res) => {
          const price = parseFloat(res.data.lowest_price.split('$')[1]);
          const result = (price / 100) * 10;
          temp.push({
            price: price + result,
            icon_url: inv.icon_url,
            name: inv.name,
          });
        })
        .catch(() => {
          console.error('ERROR RATE LIMIT MAYBE idk');
        });
    }
    return temp;
  }
}
