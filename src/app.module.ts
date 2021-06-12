import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from 'db';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        database: configService.get('DATABASE_NAME'),
        host: configService.get('DATABASE_HOST'),
        keepConnectionAlive: true,
        logging: true,
        password: configService.get('DATABASE_PASS'),
        port: Number(configService.get('DATABASE_PORT')),
        synchronize: true,
        type: 'postgres',
        username: configService.get('DATABASE_USER'),
      }),
    }),
    TypeOrmModule.forFeature([LogEntity]),
  ],
  providers: [AppService],
})
export class AppModule {}
