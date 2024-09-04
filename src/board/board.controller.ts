import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardReq } from './dto/board-req.dto';
import { BoardResp } from './dto/board-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BoardUpdateReq } from './dto/board-update.dto';

@ApiTags('Boards')
@Controller('/api/boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new board' }) // Swagger에서 설명 추가
  async create(@Body() boardReq: BoardReq) {
    await this.boardService.createBoard(boardReq);
  }

  @Get()
  @ApiOperation({ summary: 'Get all boards' }) // Swagger에서 설명 추가
  async getAllBoards(): Promise<Array<BoardResp>> {
    return await this.boardService.getAllBoards();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get board by ID' })
  async getBoardById(@Param('id') id: number): Promise<BoardResp> {
    return await this.boardService.findBoardById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a board' })
  async updateBoard(
    @Param('id') id: number,
    @Body() boardUpdateReq: BoardUpdateReq,
  ): Promise<BoardResp> {
    const updatedBoard = await this.boardService.updateBoard(
      id,
      boardUpdateReq,
    );
    return updatedBoard;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a board' })
  async deleteBoard(@Param('id') id: number): Promise<void> {
    return await this.boardService.deleteBoard(id);
  }
}
