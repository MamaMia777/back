import { Controller, Get, Post, UseGuards, Request, Response } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SteamAuthGuard } from "./steam.guard";
import { JwtAuthGuard } from "./jwt.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(SteamAuthGuard)
  @Get('login')
  login(@Request() req, @Response() res): any {
    const id = this.authService.login(req.user)
    res.redirect(`http://localhost:3000/auth/login?id=${id.accessToken}`);
  }
  
  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): any { //TODO: require an Bearer token, validate it
    const accessToken = req.headers.authorization.split(' ')[1]
    return this.authService.getProfile(accessToken)
  }


}