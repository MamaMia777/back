import { Injectable, Res } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-steam'
@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            returnURL: 'http://localhost:5000/auth/login',
            realm: 'http://localhost:5000',
            apiKey: process.env.STEAM_API_KEY,
        })
    }
    async validate(identifier: any, profile: any, done: any) {
        const payload = {
            id: profile._json.steamid,
            userName: profile._json.personaname,
            avatar: profile._json.avatarfull
        }
        return payload


    }
}
