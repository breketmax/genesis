import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import * as process from 'process';

@Injectable()
export class CompaniesService {
  constructor(private readonly httpService: HttpService) {}

  async create(
    headers: string,
    body: Record<string, string>[],
  ): Promise<Observable<Record<string, string>>> {
    const response = await this.httpService.post(
      process.env.BASE_DOMAIN + '/api/v4/companies',
      body,
      {
        headers: {
          Authorization: headers,
        },
      },
    );
    return response.pipe(map((resp) => resp.data._embedded.companies[0]));
  }
}
