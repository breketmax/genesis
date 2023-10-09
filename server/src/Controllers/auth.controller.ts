import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from '../Services/auth.service';
import { map, Observable } from 'rxjs';
import * as process from 'process';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  async getTokens(
    @Body() clientId: string,
  ): Promise<Observable<Record<string, string>>> {
    try {
      const response = await this.authService.getTokens(clientId);
      response
        .pipe(map((resp) => resp.base_domain))
        .subscribe((base_domain) => {
          process.env.BASE_DOMAIN = 'https://' + base_domain;
        });
      return response;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Wrong client id',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
