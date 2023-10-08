import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { ApiCallHelperModule } from './api-call-helpers/api-call-helper.module';
import { NewspaperModule } from './newpaper/newspaper.module';

@Module({
  imports: [
    //load configuration file (eg: .env )
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),

    //register global caching system
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        host: configService.get<string>('redis.host'),
        port: configService.get<number>('redis.port'),
      }),
    }),

    //Database configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        /**
         * For more details, see
         * https://typeorm.io/#/connection-options
         */
        type: 'postgres',
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('node_env') !== 'production',
        timezone: 'utc',
      }),
    }),

    ApiCallHelperModule,
    NewspaperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
