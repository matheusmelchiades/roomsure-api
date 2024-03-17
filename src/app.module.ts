import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './config/configuration';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        type: configService.get('database.type'),
        url: configService.get('database.url'),
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    RoomsModule,
  ],
})
export class AppModule {}
