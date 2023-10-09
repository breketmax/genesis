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
import { LeadsService } from '../Services/leads.service';
import { CompaniesService } from '../Services/companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}
  @Post()
  @HttpCode(200)
  async create(
    @Headers('Authorization') headers: string,
    @Body() body: Record<string, string>[],
  ): Promise<Observable<Record<string, string>>> {
    try {
      return await this.companiesService.create(headers, body);
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
