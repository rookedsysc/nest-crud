import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { BoardService } from '../board/board.service';
import { Comment } from './comment.entity';
import { Board } from '../board/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Board])],
  controllers: [CommentController],
  providers: [CommentService, BoardService],
  exports: [CommentService, BoardService],
})
export class CommentModule {}
