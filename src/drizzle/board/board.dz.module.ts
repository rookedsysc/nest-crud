import { Module } from '@nestjs/common';
import { BoardDzController } from './board.dz.controller';
import { BoardService } from 'src/typeorm/board/board.service';
import { BoardDzService } from './board.dz.service';
import { DBClient } from 'src/config/db.client';

@Module({
  imports: [],
  controllers: [BoardDzController],
  exports: [BoardDzService, DBClient],
  providers: [BoardDzService, DBClient],
})
export class BoardDzModule {}
