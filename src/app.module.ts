import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication/authentication.module';
import { User } from './authentication/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: `postgres`,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          database: `${configService.get('DB_NAME')}`,
          entities: [User],
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),

    //@common modules
    AuthenticationModule,

    //@domain modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
