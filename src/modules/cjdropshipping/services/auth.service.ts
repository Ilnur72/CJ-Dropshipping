import { HttpService } from '@nestjs/axios';
import {
  BadGatewayException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { IAdminConfig } from 'src/shared/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel() private readonly knex: Knex,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getAccessToken() {
    const existing = await this.knex.table('session').first();
    if (existing) throw new BadGatewayException('User already exists');

    const url =
      'https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken';
    const data = this.configService.get<IAdminConfig>('admin');

    const responce = await this.httpService.post(url, data).toPromise();
    await this.knex.table('session').insert(responce.data.data);
    console.log(responce);
    
  }

  @Cron(CronExpression.EVERY_WEEK)
  async refreshAccessToken() {
    const { openId, refreshToken } = await this.knex.table('session').first();
    const url =
      'https://developers.cjdropshipping.com/api2.0/v1/authentication/refreshAccessToken';

    const response = await this.httpService
      .post(url, { refreshToken: refreshToken })
      .toPromise();
    if (!response.data.result)
      throw new UnprocessableEntityException('Refresh token is failure');
    await this.knex
      .table('session')
      .where({ openId: openId })
      .update(response.data.data);
  }

  async logout() {
    const { openId, accessToken } = await this.knex.table('session').first();
    const url =
      'https://developers.cjdropshipping.com/api2.0/v1/authentication/logout';

    const response = await this.httpService
      .post(url, {}, { headers: { 'CJ-Access-Token': accessToken } })
      .toPromise();
    if (!response.data.data)
      throw new UnprocessableEntityException('Refresh token is failure');
    await this.knex.table('session').where({ openId: openId }).del();
  }
}
