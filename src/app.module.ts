import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { Board } from './typeorm/board/board.entity';
import { BoardModule } from './typeorm/board/board.module';
import { BoardDzModule } from './drizzle/board/board.dz.module';
import { CommentModule } from './typeorm/comment/comment.module';
import { Comment } from './typeorm/comment/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ENV: Joi.string().valid('dev', 'prod').required(),
        DB_TYPE: Joi.string().valid('mysql').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        env: configService.get<string>('ENV'),
        type: configService.get<string>('DB_TYPE') as 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Board, Comment],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    BoardModule,
    BoardDzModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
