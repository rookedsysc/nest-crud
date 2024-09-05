import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardReq } from './dto/board-req.dto';
import { BoardResp } from './dto/board-response.dto';
import { BoardUpdateReq } from './dto/board-update.dto';

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

  async updateBoard(
    id: number,
    boardUpdateReq: BoardUpdateReq,
  ): Promise<Board> {
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

    return await this.boardRepository.save(board);
  }

  async findBoardResp(id: number): Promise<BoardResp> {
    const board = await this.findBoardOrThrow(id);
    const boardResp = new BoardResp();
    boardResp.id = board.id;
    boardResp.title = board.title;
    boardResp.content = board.content;

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

    const boardResponses: BoardResp[] = boards.map((board) => {
      const boardResp = new BoardResp();
      boardResp.id = board.id;
      boardResp.title = board.title;
      boardResp.content = board.content;
      return boardResp;
    });

    return boardResponses;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
  }
}
