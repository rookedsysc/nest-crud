import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentReq } from './dto/comment-req.dto';
import { BoardService } from '../board/board.service';
import { Board } from '../board/board.entity';
import { Comment } from './comment.entity';
import { title } from 'process';
import { CommentResp } from './dto/comment-resp.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly boardService: BoardService,
  ) {}

  async createComment(commentReq: CommentReq, boardId: number) {
    const board: Board = await this.boardService.findBoardOrThrow(boardId);
    const comment: Comment = new Comment(
      commentReq.title,
      commentReq.content,
      board,
    );
    this.commentRepository.save(comment);
  }

  async updateComment(id: number, commentReq: CommentReq) {
    const comment: Comment = await this.commentRepository.findOne({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    comment.title = commentReq.title;
    comment.content = commentReq.content;

    await this.commentRepository.save(comment);
  }

  async findCommentsByBoardIdOrThrow(
    boardId: number,
  ): Promise<Array<CommentResp>> {
    const board: Board = await this.boardService.findBoardOrThrow(boardId);
    const comments: Array<Comment> = await board.comments;
    return comments.map((comment) => {
      return new CommentResp(
        comment.id,
        comment.title,
        comment.content,
        comment.createdAt,
      );
    });
  }

  async deleteCommentByIdOrThrow(id: number) {
    const comment: Comment = await this.commentRepository.findOne({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    await this.commentRepository.delete({ id });
  }
}
