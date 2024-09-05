import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { BoardDzService } from "./board.dz.service";
import { Controller, Get } from "@nestjs/common";
import { BoardDzResp } from "./dto/board.dz.resp";

@ApiTags('BoardDz')
@Controller('/api/board-dz')
export class BoardDzController {
  constructor(private readonly boardDzService: BoardDzService) {}

  @Get()
  @ApiOperation({ summary: 'Get all boards' })
  async getAllBoards(): Promise<Array<BoardDzResp>> {
    return await this.boardDzService.selectAllBoards();
  }
}