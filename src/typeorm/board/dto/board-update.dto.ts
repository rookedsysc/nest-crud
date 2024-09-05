import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BoardReq } from './board-req.dto';

export class BoardUpdateReq extends PartialType(BoardReq) {
  @ApiProperty({ description: 'The title of the board', required: false })
  title?: string;

  @ApiProperty({ description: 'The content of the board', required: false })
  content?: string;
}
