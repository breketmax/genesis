import {
  Body,
  Controller,
  HttpCode,
  Post,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ContactService } from '../Services/contact.service';
import { Observable } from 'rxjs';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}
  @Post()
  @HttpCode(200)
  async create(
    @Headers('Authorization') headers: string,
    @Body() body: Record<string, string>[],
  ): Promise<Observable<Record<string, string>>> {
    try {
      return await this.contactService.create(headers, body);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Something wrong',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
