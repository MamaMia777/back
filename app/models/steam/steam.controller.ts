import { Controller, Get } from '@nestjs/common';
import { SteamService } from './steam.service';

@Controller('steam')
export class SteamController {
  constructor(private steamService: SteamService) {}

  @Get('items')
  getItems() {
    return this.steamService.getItemsFromInventory();
  }
}
