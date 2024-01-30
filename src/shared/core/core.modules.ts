import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configService, { IDatabaseConfig } from '../config';
import { KnexModule } from 'nest-knexjs';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configService],
    }),
    KnexModule.forRootAsync({
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => {
        const { host, user, name, password } =
          configService.get<IDatabaseConfig>('db');
        return {
          config: {
            client: 'pg',
            useNullAsDefault: true,
            connection: {
              host: host,
              user: user,
              database: name,
              password: password,
            },
          },
        };
      },
    }),
  ],
  exports: [ConfigModule, KnexModule],
})
export class CoreModule {}
