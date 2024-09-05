import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardReq } from './dto/board-req.dto';
import { BoardResp } from './dto/board-response.dto';
import { BoardUpdateReq } from './dto/board-update.dto';
import { CommentResp } from '../comment/dto/comment-resp.dto';
import { title } from 'process';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async createBoard(boardReq: BoardReq): Promise<Board> {
    const board = new Board();
    board.title = boardReq.title;
    board.content = boardReq.content;

    return await this.boardRepository.save(board);
  }

  async updateBoard(id: number, boardUpdateReq: BoardUpdateReq) {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    if (boardUpdateReq.title) {
      board.title = boardUpdateReq.title;
    }
    if (boardUpdateReq.content) {
      board.content = boardUpdateReq.content;
    }
    this.boardRepository.save(board);
  }

  async findBoardResp(id: number): Promise<BoardResp> {
    const board = await this.findBoardOrThrow(id);

    // comment DTO 생성
    const comments = await board.comments;
    const commentResponses: CommentResp[] = comments.map((comment) => {
      const commentResp = new CommentResp(
        comment.id,
        comment.title,
        comment.content,
        comment.createdAt,
      );
      return commentResp;
    });

    // board DTO
    const boardResp = new BoardResp(
      board.id,
      board.title,
      board.content,
      commentResponses,
    );

    return boardResp;
  }

  async findBoardOrThrow(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({ where: { id } });

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    return board;
  }

  async getAllBoards(): Promise<BoardResp[]> {
    const boards = await this.boardRepository.find();

    const futureResponses = boards.map(async (board) => {
      const comments = await board.comments;
      const commentResponses: CommentResp[] = comments.map((comment) => {
        return new CommentResp(
          comment.id,
          comment.title,
          comment.content,
          comment.createdAt,
        );
      });

      return new BoardResp(
        board.id,
        board.title,
        board.content,
        commentResponses,
      );
    });
    const boardResponses = await Promise.all(futureResponses);

    return boardResponses;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
  }
}
